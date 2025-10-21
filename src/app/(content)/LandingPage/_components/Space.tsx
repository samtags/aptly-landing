"use client";

import { useEffect, useRef, useState } from "react";
import Cursor from "./Cursor";
import throttle from "lodash.throttle";
import { v7 } from "uuid";
import { uniqueNamesGenerator, animals } from "unique-names-generator";
import { useStream, usePublish } from "@aptly-sdk/brook/react";

type ClientInfo = {
  id: string;
  name: string;
  status: "active" | "inactive";
};

type ClientsMap = {
  [key: string]: ClientInfo;
};

export default function Space() {
  const [clients, setClients] = useState<ClientsMap>({});

  // current client state
  const [name] = useState(
    uniqueNamesGenerator({
      dictionaries: [animals],
    })
  );
  const [currentUserStatus, setCurrentUserStatus] = useState<
    "active" | "inactive"
  >("inactive");
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
            // Mark client as idle after 30s inactivity
            console.log(`Client ${client.name} is idle`);
          }}
          onAbandon={() => {
            // Remove client after 60s inactivity
            console.log(`Client ${client.name} abandoned`);
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

/**
 * Client component that displays cursor with name tag.
 *
 * @param {object} props - Component props.
 * @param {string} props.name - Client name to display.
 * @returns {JSX.Element} Client cursor component.
 */
function Client({ name }: { name: string }) {
  const colors = generateColor(name);

  return (
    <span className="flex">
      <Cursor size="24" color={colors.color} />
      <span
        className="capitalize rounded-full px-3 py-1 mt-5 ml-[-8px] font-medium"
        style={{
          backgroundColor: colors.backgroundColor,
          color: colors.color,
        }}
      >
        {name}
      </span>
    </span>
  );
}

/**
 * Avatar component that displays user initials with status indicator.
 *
 * @param {object} props - Component props.
 * @param {string} props.name - User name to display.
 * @param {string} props.status - User status (active or inactive).
 * @returns {JSX.Element} Avatar component.
 */
function Avatar({ name, status }: { name: string; status: string }) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const colors = generateColor(name);

  return (
    <div className="relative pointer-events-none">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2"
        style={{
          backgroundColor: colors.backgroundColor,
          color: colors.color,
          borderColor: colors.borderColor,
        }}
      >
        {initials}
      </div>
      {/* Status indicator */}
      <div
        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
          status === "active" ? "bg-green-500" : "bg-gray-400"
        }`}
      />
    </div>
  );
}

/**
 * ClientCursor component that tracks and displays remote client cursors.
 * Handles idle and abandon timers. Only shows cursor when client is active.
 *
 * @param {object} props - Component props.
 * @param {string} props.id - Client ID.
 * @param {string} props.name - Client name.
 * @param {string} props.status - Client status (active or inactive).
 * @param {function} props.onIdle - Callback triggered after 30s inactivity.
 * @param {function} props.onAbandon - Callback triggered after 60s inactivity.
 * @returns {JSX.Element} ClientCursor component.
 */
function ClientCursor({
  id,
  name,
  status,
  onIdle,
  onAbandon,
}: {
  id: string;
  name: string;
  status: "active" | "inactive";
  onIdle: () => void;
  onAbandon: () => void;
}) {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const abandonTimerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Restarts the idle timer (30s timeout).
   */
  function restartIdleTimer() {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(onIdle, 1000 * 30);
  }

  /**
   * Restarts the abandon timer (60s timeout).
   */
  function restartAbandonTimer() {
    if (abandonTimerRef.current) clearTimeout(abandonTimerRef.current);
    abandonTimerRef.current = setTimeout(onAbandon, 1000 * 60);
  }

  /**
   * Initialize timers and cleanup on unmount.
   */
  useEffect(() => {
    restartIdleTimer();
    restartAbandonTimer();

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (abandonTimerRef.current) clearTimeout(abandonTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Listen for mousemove events from this specific client.
   * Updates cursor position and resets timers.
   */
  useStream("spaces", (message) => {
    if (message.id !== id) return;

    restartIdleTimer();
    restartAbandonTimer();

    if (message?.x !== undefined && message?.y !== undefined) {
      setCoordinates({
        x: message.x,
        y: message.y,
      });
    }
  });

  // Only show cursor when client is active
  if (status !== "active") {
    return null;
  }

  return (
    <span
      className="absolute pointer-events-none transition-all duration-100"
      style={{
        left: `${coordinates.x}px`,
        top: `${coordinates.y}px`,
      }}
    >
      <Client name={name} />
    </span>
  );
}

/**
 * Generates a consistent color palette from a text string.
 *
 * @param {string} text - Text to generate color from.
 * @returns {object} Color palette with backgroundColor, color, and borderColor.
 */
function generateColor(text: string) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  const s = 70; // saturation
  const l = 85; // lightness

  const backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  const color = `hsl(${h}, ${s}%, ${l - 45}%)`;
  const borderColor = `hsl(${h}, ${s}%, ${l - 25}%)`;

  return { backgroundColor, color, borderColor };
}
