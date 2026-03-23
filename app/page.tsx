"use client";

import { useState } from "react";
import { parseTitle } from "../lib/parse";

const data = [
  {
    time: "08:30",
    title: "AB-124-GD | Colin | 0612345678 | Embrayage",
    accent: "#3b82f6",
    googleUrl: "https://calendar.google.com",
  },
  {
    time: "10:00",
    title: "EF-456-HJ | Martin | 06 98 45 12 33 | Révision",
    accent: "#f59e0b",
    googleUrl: "https://calendar.google.com",
  },
];

export default function Page() {
  const [date, setDate] = useState(new Date());

  const previousDay = () => {
    const d = new Date(date);
    d.setDate(d.getDate() - 1);
    setDate(d);
  };

  const nextDay = () => {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    setDate(d);
  };

  const formatDay = () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Aujourd'hui";
    if (date.toDateString() === tomorrow.toDateString()) return "Demain";

    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const openGoogle = (url: string) => {
    window.location.href = url;
  };

  return (
    <main style={styles.page}>
      <section style={styles.widget}>
        <div style={styles.top}>
          <button style={styles.btn}>+ Nouveau RDV</button>

          <div style={styles.nav}>
            <button onClick={previousDay} style={styles.navBtn}>‹</button>
            <span style={styles.day}>{formatDay()}</span>
            <button onClick={nextDay} style={styles.navBtn}>›</button>
          </div>
        </div>

        {data.map((item, i) => {
          const p = parseTitle(item.title);

          return (
            <div key={i} style={styles.row}>
              <div>{item.time}</div>

              <div>
                <div style={styles.client}>{p.client}</div>
                <div style={styles.meta}>
                  <span style={{ ...styles.bar, background: item.accent }} />
                  {p.plate} | 📞 {p.phone}
                </div>
              </div>

              <div style={styles.right}>
                <span style={{ ...styles.badge, color: item.accent }}>
                  {p.intervention}
                </span>
                <button onClick={() => openGoogle(item.googleUrl)}>⋯</button>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { padding: 30, background: "#f6f8fc", minHeight: "100vh" },
  widget: { maxWidth: 900, margin: "0 auto", background: "#fff", padding: 20, borderRadius: 20 },
  top: { display: "flex", justifyContent: "space-between", marginBottom: 20 },
  btn: { padding: "10px 15px", cursor: "pointer" },
  nav: { display: "flex", alignItems: "center", gap: 10 },
  navBtn: { padding: "6px 10px", cursor: "pointer" },
  day: { fontWeight: 700 },
  row: {
    display: "grid",
    gridTemplateColumns: "100px 1fr auto",
    gap: 15,
    alignItems: "center",
    padding: 15,
    border: "1px solid #eee",
    borderRadius: 12,
    marginBottom: 10,
  },
  client: { fontWeight: 800 },
  meta: { display: "flex", gap: 8, alignItems: "center" },
  bar: { width: 5, height: 20, borderRadius: 10 },
  right: { display: "flex", gap: 10, alignItems: "center" },
  badge: { padding: "5px 10px", border: "1px solid #ddd", borderRadius: 10 },
};
