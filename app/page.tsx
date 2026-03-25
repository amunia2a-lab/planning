"use client";

import { useEffect, useMemo, useState } from "react";
import { parseTitle, formatPhone } from "../lib/parse";

type EventItem = {
  time: string;
  title: string;
  url: string;
  colorId?: string;
};

const COLORS = {
  "1": "#a4bdfc",
  "2": "#7ae7bf",
  "3": "#dbadff",
  "4": "#ff887c",
  "5": "#fbd75b",
  "6": "#ffb878",
  "7": "#46d6db",
  "8": "#e1e1e1",
  "9": "#5484ed",
  "10": "#51b749",
  "11": "#dc2127"
};

export default function Page() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState<EventItem[]>([]);

  const dayLabel = useMemo(() => {
    const today = new Date();
    if (date.toDateString() === today.toDateString()) return "Aujourd'hui";
    return date.toLocaleDateString("fr-FR");
  }, [date]);

  useEffect(() => {
    fetch(`/api/events?day=${date.toISOString().slice(0,10)}`)
      .then(res => res.json())
      .then(setEvents);
  }, [date]);

  return (
    <main style={{ padding: 8, background: "transparent" }}>
      <div style={{ maxWidth: 900, margin: "auto", background: "white", padding: 16, borderRadius: 16 }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span>🔧</span>
            <h2 style={{ margin: 0 }}>Planning - {dayLabel}</h2>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setDate(new Date(date.setDate(date.getDate()-1)))}>‹</button>
            <button onClick={() => setDate(new Date(date.setDate(date.getDate()+1)))}>›</button>
          </div>
        </div>

        {events.map((e, i) => {
          const p = parseTitle(e.title);
          const color = COLORS[e.colorId || ""] || "#3b82f6";

          return (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>

              <div style={{ display: "flex", gap: 12 }}>
                <strong>{e.time}</strong>

                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ width: 4, background: color }} />
                  <span>{p.plate}</span>
                  <span>|</span>
                  <span>{p.client}</span>
                  <span>📞 {formatPhone(p.phone)}</span>
                </div>
              </div>

              <span style={{ background: color, padding: "4px 8px", borderRadius: 8 }}>
                {p.intervention}
              </span>

            </div>
          );
        })}

      </div>
    </main>
  );
}
