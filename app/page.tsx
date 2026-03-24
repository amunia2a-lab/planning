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
  {
    time: "14:00",
    title: "GH-782-KL | Dupont | 0677541028 | Diagnostic",
    accent: "#8b5cf6",
    googleUrl: "https://calendar.google.com",
  },
  {
    time: "16:00",
    title: "JK-903-MN | Lucas | 0655432109 | Freinage",
    accent: "#10b981",
    googleUrl: "https://calendar.google.com",
  },
];

function formatGoogleDate(date: Date, hour = 8, minute = 0) {
  const d = new Date(date);
  d.setHours(hour, minute, 0, 0);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  return `${year}${month}${day}T${h}${m}00`;
}

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

  const createNewAppointment = () => {
    const start = formatGoogleDate(date, 8, 0);
    const end = formatGoogleDate(date, 9, 0);
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${start}/${end}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main style={styles.page}>
      <section style={styles.widget}>
        <div style={styles.topBar}>
          <div style={styles.titleRow}>
            <span style={styles.calendarIcon}>📅</span>
            <h1 style={styles.title}>Planning - Aujourd&apos;hui</h1>
          </div>

          <div style={styles.rightHeader}>
            <button style={styles.newButton} onClick={createNewAppointment}>+ Nouveau RDV</button>

            <div style={styles.navGroup}>
              <button onClick={previousDay} style={styles.navButton}>‹</button>
              <span style={styles.dayPill}>{formatDay()}</span>
              <button onClick={nextDay} style={styles.navButton}>›</button>
            </div>
          </div>
        </div>

        <div style={styles.rowsWrap}>
          {data.map((item, i) => {
            const p = parseTitle(item.title);

            return (
              <div key={i} style={styles.row}>
                <div style={styles.timeCard}>{item.time}</div>

                <div style={styles.infoBlock}>
                  <div style={styles.clientBig}>{p.client}</div>

                  <div style={styles.metaRow}>
                    <span style={{ ...styles.plateMarker, background: item.accent }} />
                    <span style={styles.plate}>{p.plate}</span>
                    <span style={styles.separator}>|</span>
                    <span style={styles.phoneWrap}>
                      <span style={styles.phoneIcon}>📞</span>
                      <span style={styles.phone}>{p.phone}</span>
                    </span>
                  </div>

                  <span
                    style={{
                      ...styles.fadeLine,
                      background: `linear-gradient(90deg, ${item.accent}, rgba(255,255,255,0))`,
                    }}
                  />
                </div>

                <div style={styles.actions}>
                  <span
                    style={{
                      ...styles.interventionBadge,
                      color: item.accent,
                      border: `1px solid ${item.accent}33`,
                      background: `${item.accent}14`,
                    }}
                  >
                    {p.intervention}
                  </span>

                  <button
                    type="button"
                    style={styles.moreButton}
                    onClick={() => openGoogle(item.googleUrl)}
                    title="Ouvrir dans Google Agenda"
                  >
                    ⋯
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    padding: "28px",
    margin: 0,
    background:
      "radial-gradient(circle at left bottom, rgba(191,219,254,0.55), transparent 28%), linear-gradient(180deg, #f6f8fc 0%, #eef3fa 100%)",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  widget: {
    maxWidth: 1280,
    margin: "0 auto",
    background: "rgba(255,255,255,0.72)",
    border: "1px solid rgba(255,255,255,0.85)",
    borderRadius: 34,
    padding: 28,
    boxShadow: "0 28px 80px rgba(15, 23, 42, 0.10)",
    backdropFilter: "blur(18px)",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 18,
    marginBottom: 22,
    flexWrap: "wrap",
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  calendarIcon: {
    fontSize: 28,
  },
  title: {
    margin: 0,
    fontSize: 28,
    fontWeight: 800,
    color: "#0f172a",
    letterSpacing: -0.5,
  },
  rightHeader: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    flexWrap: "wrap",
  },
  newButton: {
    height: 50,
    borderRadius: 16,
    border: "1px solid #dbeafe",
    background: "#eff6ff",
    color: "#2563eb",
    padding: "0 18px",
    fontWeight: 800,
    fontSize: 15,
    cursor: "pointer",
    boxShadow: "0 10px 24px rgba(59,130,246,0.10)",
  },
  navGroup: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    border: "1px solid #e2e8f0",
    background: "#ffffff",
    color: "#334155",
    fontSize: 24,
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(15,23,42,0.05)",
  },
  dayPill: {
    height: 44,
    display: "inline-flex",
    alignItems: "center",
    padding: "0 16px",
    borderRadius: 14,
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    color: "#0f172a",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
  rowsWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "140px 1fr auto",
    alignItems: "center",
    gap: 18,
    background: "rgba(255,255,255,0.88)",
    border: "1px solid #e5e7eb",
    borderRadius: 28,
    padding: 18,
    boxShadow: "0 10px 26px rgba(15, 23, 42, 0.05)",
  },
  timeCard: {
    height: 74,
    borderRadius: 20,
    background: "#f8fafc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#0f172a",
    fontWeight: 800,
    fontSize: 20,
    whiteSpace: "nowrap",
  },
  infoBlock: {
    minWidth: 0,
  },
  clientBig: {
    fontWeight: 800,
    fontSize: 20,
    color: "#0f172a",
    lineHeight: 1.1,
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: 18,
    marginTop: 10,
    minWidth: 0,
    overflow: "hidden",
  },
  plateMarker: {
    width: 6,
    height: 26,
    borderRadius: 999,
    marginRight: 10,
    flexShrink: 0,
  },
  plate: {
    color: "#334155",
    fontWeight: 900,
    fontSize: 17,
    letterSpacing: 0.6,
    marginRight: 12,
  },
  separator: {
    color: "#94a3b8",
    margin: "0 10px",
    fontWeight: 700,
  },
  phoneWrap: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    marginLeft: 8,
  },
  phoneIcon: {
    fontSize: 15,
    lineHeight: 1,
  },
  phone: {
    color: "#64748b",
    fontWeight: 600,
    fontSize: 16,
  },
  fadeLine: {
    width: 140,
    height: 5,
    marginTop: 10,
    borderRadius: 999,
    opacity: 0.8,
    display: "block",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  interventionBadge: {
    padding: "10px 16px",
    borderRadius: 16,
    fontWeight: 700,
    fontSize: 14,
    whiteSpace: "nowrap",
  },
  moreButton: {
    width: 46,
    height: 46,
    borderRadius: 16,
    border: "1px solid #e2e8f0",
    background: "#f8fafc",
    color: "#64748b",
    fontSize: 24,
    cursor: "pointer",
  },
};
