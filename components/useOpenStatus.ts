"use client";

import { useEffect, useState } from "react";
import { clinic } from "@/lib/clinic";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const toMin = (s: string) => {
  const [h, m] = s.split(":").map(Number);
  return h * 60 + m;
};
const fmt = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  const ap = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}${m ? ":" + String(m).padStart(2, "0") : ""} ${ap}`;
};

export type OpenStatus = { ready: boolean; open: boolean; label: string };

/** Live OPD status, computed in clinic time (IST) on the client. */
export function useOpenStatus(): OpenStatus {
  const [status, setStatus] = useState<OpenStatus>({ ready: false, open: false, label: "OPD hours" });

  useEffect(() => {
    const compute = () => {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }).formatToParts(new Date());
      const day = DAYS.indexOf(parts.find((p) => p.type === "weekday")!.value);
      const now = Number(parts.find((p) => p.type === "hour")!.value) * 60 + Number(parts.find((p) => p.type === "minute")!.value);

      for (const [a, b] of clinic.sessions[day] ?? []) {
        if (now >= toMin(a) && now < toMin(b)) return setStatus({ ready: true, open: true, label: `OPD open · until ${fmt(toMin(b))}` });
      }
      for (let i = 0; i < 7; i++) {
        const d = (day + i) % 7;
        const next = (clinic.sessions[d] ?? []).find(([a]) => i > 0 || toMin(a) > now);
        if (next) {
          const when = i === 0 ? "" : i === 1 ? "tomorrow " : DAYS[d] + " ";
          return setStatus({ ready: true, open: false, label: `OPD opens ${when}${fmt(toMin(next[0]))}` });
        }
      }
      setStatus({ ready: true, open: false, label: "OPD closed" });
    };
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, []);

  return status;
}
