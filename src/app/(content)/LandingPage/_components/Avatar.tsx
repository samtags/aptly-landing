"use client";

import { generateColor } from "@/lib/utils/generateColor";
import type { ClientStatus } from "./space-types";

/**
 * Avatar component that displays user initials with status indicator.
 * Shows a colored circle with initials and a status dot (green for active, gray for inactive).
 *
 * @param {object} props - Component props.
 * @param {string} props.name - User name to display.
 * @param {ClientStatus} props.status - User status (active or inactive).
 * @returns {JSX.Element} Avatar component.
 */
export default function Avatar({
  name,
  status,
}: {
  name: string;
  status: ClientStatus;
}) {
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
