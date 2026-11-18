"use client";

import { useOpenStatus } from "./useOpenStatus";

export default function ContactStatus() {
  const s = useOpenStatus();
  return (
    <p className="mt-4 flex items-center gap-3 font-serif text-[30px] leading-tight">
      <span className="relative flex size-3">
        {s.open && <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-mint" />}
        <span className={`relative inline-flex size-3 rounded-full ${s.open ? "bg-mint" : "bg-mute/50"}`} />
      </span>
      {s.ready ? s.label : "Checking hours…"}
    </p>
  );
}
