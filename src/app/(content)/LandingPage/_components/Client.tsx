"use client";

import Cursor from "./Cursor";
import { generateColor } from "@/lib/utils/generateColor";

/**
 * Client component that displays cursor with name tag.
 * Uses consistent colors generated from the client name.
 *
 * @param {object} props - Component props.
 * @param {string} props.name - Client name to display.
 * @returns {JSX.Element} Client cursor component.
 */
export default function Client({ name }: { name: string }) {
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
