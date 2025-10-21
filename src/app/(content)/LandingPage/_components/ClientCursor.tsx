"use client";

import { useEffect, useRef, useState } from "react";
import { useStream } from "@aptly-sdk/brook/react";
import Client from "./Client";
import type { ClientStatus } from "./space-types";

/**
 * ClientCursor component that tracks and displays remote client cursors.
 * Handles idle and abandon timers. Only shows cursor when client is active.
 *
 * @param {object} props - Component props.
 * @param {string} props.id - Client ID.
 * @param {string} props.name - Client name.
 * @param {ClientStatus} props.status - Client status (active or inactive).
 * @param {function} props.onIdle - Callback triggered after 30s inactivity.
 * @param {function} props.onAbandon - Callback triggered after 60s inactivity.
 * @returns {JSX.Element | null} ClientCursor component or null if inactive.
 */
export default function ClientCursor({
  id,
  name,
  status,
  onIdle,
  onAbandon,
}: {
  id: string;
  name: string;
  status: ClientStatus;
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
