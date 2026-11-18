"use client";

import Link from "next/link";
import { clinic, tel, waLink } from "@/lib/clinic";
import { Calendar, Phone, WhatsApp } from "./Icons";

/** Thumb-reach action dock on phones. */
export default function MobileDock() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-[1fr_1fr_1.3fr] gap-1.5 rounded-full border border-ink/10 bg-paper/95 p-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,.35)] lg:hidden"
    >
      <Link href="/contact#book" className="flex items-center justify-center gap-2 rounded-full py-3 text-[13px] font-medium text-ink">
        <Calendar className="size-4" /> Book
      </Link>
      <a href={waLink()} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 rounded-full py-3 text-[13px] font-medium text-[#128c4b]">
        <WhatsApp className="size-4" /> Chat
      </a>
      <a href={tel(clinic.phones.emergency)} className="flex items-center justify-center gap-2 rounded-full bg-pulse py-3 text-[13px] font-medium text-on-pulse">
        <Phone className="size-4" /> Emergency
      </a>
    </nav>
  );
}
