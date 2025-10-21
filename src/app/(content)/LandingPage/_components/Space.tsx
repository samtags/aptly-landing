"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import Cursor from "./Cursor";
import throttle from "lodash.throttle";
import { v7 } from "uuid";
import { uniqueNamesGenerator, animals } from "unique-names-generator";

export default function Space() {
  const [name, setName] = useState(
    uniqueNamesGenerator({
      dictionaries: [animals],
    })
  );
  const idRef = useRef(v7());
  const id = idRef.current;

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      console.log("mouse coordinates", { x, y });

      const targetEl = document.getElementById("client-cursor");
      if (!targetEl) return;

      targetEl.style.left = `${x}px`;
      targetEl.style.top = `${y}px`;
    }

    // 30 ms for owner's throttle
    const throttled = throttle(handleMouseMove, 30);

    // 60 ms for sending throttled event to server

    const el = document.getElementById("space");
    if (!el) return;

    el.addEventListener("mousemove", throttled);

    return () => {
      el.removeEventListener("mousemove", throttled);
    };
  });

  return (
    <div
      id="space"
      onMouseEnter={() => (document.body.style.cursor = "none")}
      onMouseLeave={() => (document.body.style.cursor = "default")}
      className="space relative pt-4 text-center text-[#555a68] font-InterLight text-[12px] mt-6 h-[280px] sm:h-[340px] lg:h-[380px] bg-[#f9fafb] rounded-2xl sm:rounded-3xl mx-4 sm:mx-0 overflow-hidden"
    >
      <span id="client-cursor" className="absolute pointer-events-none">
        <Client name={name} />
      </span>
    </div>
  );
}

function Client({ name }: { name: string }) {
  return (
    <span className="flex">
      <Cursor size="24" />
      <span className="capitalize text-white rounded-full bg-[#595959] px-3 py-1 mt-5 ml-[-8px]">
        {name}
      </span>
    </span>
  );
}
