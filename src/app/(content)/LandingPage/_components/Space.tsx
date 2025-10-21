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
  const idRef = useRef(v7());
  const id = idRef.current;

  const publish = usePublish("spaces");
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Cleanup heartbeat interval on unmount.
   */
  useEffect(() => {
    return () => {
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }
    };
  }, []);

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

    function handleMouseMoveToServer(e: MouseEvent) {
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
   */
  function handleMouseEnter() {
    document.body.style.cursor = "none";
    setCurrentUserStatus("active");

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
      publish({
        type: "heartbeat",
        id,
        name,
      });
    }, 5000);
  }

  /**
   * Stops heartbeat and sends inactive message when mouse leaves.
   */
  function handleMouseLeave() {
    document.body.style.cursor = "default";
    setCurrentUserStatus("inactive");

    // Clear heartbeat interval
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
      heartbeatIntervalRef.current = null;
    }

    // Send inactive message
    publish({
      type: "inactive",
      id,
      name,
    });
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
        {/* Current client avatar */}
        <Avatar name={name} status={currentUserStatus} />

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
