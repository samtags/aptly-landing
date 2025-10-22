"use client";

import { useEffect, useRef, useState } from "react";
import throttle from "lodash.throttle";
import { v7 } from "uuid";
import { uniqueNamesGenerator, animals } from "unique-names-generator";
import { useStream, usePublish } from "@aptly-sdk/brook/react";
import Client from "./Client";
import Avatar from "./Avatar";
import ClientCursor from "./ClientCursor";
import type { ClientsMap, ClientStatus } from "./space-types";

export default function Space() {
  const [clients, setClients] = useState<ClientsMap>({});

  // current client state
  const [name] = useState(
    uniqueNamesGenerator({
      dictionaries: [animals],
    })
  );
  const [currentUserStatus, setCurrentUserStatus] =
    useState<ClientStatus>("inactive");
  const [hasEntered, setHasEntered] = useState(false);
  const hasOtherClientsRef = useRef(false);
  const idRef = useRef(v7());
  const id = idRef.current;

  const publish = usePublish("spaces");
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentUserIdleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentUserAbandonTimerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Updates the hasOtherClientsRef whenever clients state changes.
   * Reason: Avoid heavy computation on every mouse move by caching the result.
   */
  useEffect(() => {
    const otherClientsCount = Object.values(clients).filter(
      (client) => client.id !== id
    ).length;
    hasOtherClientsRef.current = otherClientsCount > 0;
  }, [clients, id]);

  /**
   * Cleanup intervals and timers on unmount.
   */
  useEffect(() => {
    return () => {
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }
      if (currentUserIdleTimerRef.current) {
        clearTimeout(currentUserIdleTimerRef.current);
      }
      if (currentUserAbandonTimerRef.current) {
        clearTimeout(currentUserAbandonTimerRef.current);
      }
    };
  }, []);

  /**
   * Restarts the current user's idle timer (30s timeout).
   */
  function restartCurrentUserIdleTimer() {
    if (currentUserIdleTimerRef.current) {
      clearTimeout(currentUserIdleTimerRef.current);
    }
    currentUserIdleTimerRef.current = setTimeout(() => {
      setCurrentUserStatus("inactive");
    }, 1000 * 30);
  }

  /**
   * Restarts the current user's abandon timer (60s timeout).
   */
  function restartCurrentUserAbandonTimer() {
    if (currentUserAbandonTimerRef.current) {
      clearTimeout(currentUserAbandonTimerRef.current);
    }
    currentUserAbandonTimerRef.current = setTimeout(() => {
      setHasEntered(false);
      setCurrentUserStatus("inactive");
    }, 1000 * 60);
  }

  /**
   * Handles incoming stream messages for client state management.
   * Updates client list based on active, heartbeat, and inactive messages.
   * Ignores messages from the current user.
   */
  useStream("spaces", (message) => {
    if (!message || !message.id) return;

    // Ignore messages from current user
    if (message.id === id) return;

    switch (message.type) {
      case "active":
      case "heartbeat":
        setClients((prev) => ({
          ...prev,
          [message.id]: {
            ...(prev?.[message?.id] || {}),
            id: message.id,
            name: message.name,
            status: "active",
          },
        }));
        break;

      case "inactive":
        setClients((prev) => ({
          ...prev,
          [message.id]: {
            ...(prev?.[message?.id] || {}),
            id: message.id,
            name: message.name,
            status: "inactive",
          },
        }));
        break;

      default:
        break;
    }
  });

  /**
   * Handles mouse movement for client UI and sends coordinates to server.
   * Updates local cursor position and publishes mousemove events.
   */
  useEffect(() => {
    function handleMouseMoveForClientUI(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const targetEl = document.getElementById("client-cursor");
      if (!targetEl) return;

      targetEl.style.left = `${x}px`;
      targetEl.style.top = `${y}px`;
    }

    /**
     * Publishes mouse movement to server only if other clients are connected.
     * Reason: Optimize bandwidth by not sending data when no one else is present.
     *
     * @param {MouseEvent} e - The mouse movement event.
     */
    function handleMouseMoveToServer(e: MouseEvent) {
      // Only publish if there are other clients connected
      if (!hasOtherClientsRef.current) return;

      const target = e.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      publish({
        type: "mousemove",
        id,
        name,
        x,
        y,
      });
    }

    // 30 ms for owner's UI throttle
    const throttledUI = throttle(handleMouseMoveForClientUI, 30);

    // 100 ms for sending throttled event to server
    const throttledServer = throttle(handleMouseMoveToServer, 100);

    function handleMouseMove(e: MouseEvent) {
      throttledUI(e);
      throttledServer(e);
      // Reset current user's idle/abandon timers on every mouse movement
      restartCurrentUserIdleTimer();
      restartCurrentUserAbandonTimer();
    }

    const el = document.getElementById("space");
    if (!el) return;

    el.addEventListener("mousemove", handleMouseMove);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, [publish, id, name]);

  /**
   * Starts heartbeat interval when mouse enters the space.
   * Sends active message and sets up periodic heartbeat.
   * Also marks user as entered and starts idle/abandon timers.
   */
  function handleMouseEnter() {
    document.body.style.cursor = "none";
    setCurrentUserStatus("active");
    setHasEntered(true);

    // Send active message
    publish({
      type: "active",
      id,
      name,
    });

    // Start heartbeat interval (every 5 seconds)
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
    }

    heartbeatIntervalRef.current = setInterval(() => {
      // Only send heartbeat if there are other clients connected
      // Reason: Optimize bandwidth by not sending periodic updates when alone
      if (hasOtherClientsRef.current) {
        publish({
          type: "heartbeat",
          id,
          name,
        });
      }
    }, 5000);

    // Start idle/abandon timers
    restartCurrentUserIdleTimer();
    restartCurrentUserAbandonTimer();
  }

  /**
   * Stops heartbeat and sends inactive message when mouse leaves.
   * Only sends inactive message if other clients are connected.
   * Reason: Optimize bandwidth by not sending messages when no one is listening.
   */
  function handleMouseLeave() {
    document.body.style.cursor = "default";
    setCurrentUserStatus("inactive");

    // Clear heartbeat interval
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
      heartbeatIntervalRef.current = null;
    }

    // Only send inactive message if there are other clients connected
    if (hasOtherClientsRef.current) {
      publish({
        type: "inactive",
        id,
        name,
      });
    }
  }

  // Filter out current client and get active clients
  const otherClients = Object.values(clients).filter(
    (client) => client.id !== id
  );

  return (
    <div
      id="space"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="space relative pt-4 text-center text-[#555a68] font-InterLight text-[12px] mt-6 h-[280px] sm:h-[340px] lg:h-[380px] bg-[#f9fafb] rounded-2xl sm:rounded-3xl mx-4 sm:mx-0 overflow-hidden"
    >
      {/* Current client cursor - only show when active */}
      {currentUserStatus === "active" && (
        <span id="client-cursor" className="absolute pointer-events-none">
          <Client name={name} />
        </span>
      )}

      {/* Other clients' cursors */}
      {otherClients.map((client) => (
        <ClientCursor
          key={client.id}
          id={client.id}
          name={client.name}
          status={client.status}
          onIdle={() => {
            // Mark client as inactive after 30s inactivity
            setClients((prev) => ({
              ...prev,
              [client.id]: {
                ...prev[client.id],
                status: "inactive",
              },
            }));
          }}
          onAbandon={() => {
            // Remove client after 60s inactivity
            setClients((prev) => {
              const updated = { ...prev };
              delete updated[client.id];
              return updated;
            });
          }}
        />
      ))}

      {/* Avatars section */}
      <div className="absolute top-4 left-4 flex pointer-events-none">
        {/* Current client avatar - only show if user has entered */}
        {hasEntered && <Avatar name={name} status={currentUserStatus} />}

        {/* Other clients avatars */}
        {otherClients.map((client) => (
          <div key={client.id} className="ml-[-12px]">
            <Avatar name={client.name} status={client.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
