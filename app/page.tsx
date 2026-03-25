"use client";

import { useEffect, useMemo, useState } from "react";
import { parseTitle, formatPhone } from "../lib/parse";

type EventItem = {
  time: string;
  title: string;
  url: string;
};

const ACCENTS = ["#3b82f6", "#f59e0b", "#8b5cf6", "#10b981", "#ef4444", "#14b8a6"];

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
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dayLabel = useMemo(() => {
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
  }, [date]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const day = date.toISOString().slice(0, 10);
        const res = await fetch(`/api/events?day=${day}`, { cache: "no-store" });
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json?.error || "Erreur chargement agenda");
        }
        if (!cancelled) setEvents(json);
      } catch (e: any) {
        if (!cancelled) {
          setEvents([]);
          setError(e?.message || "Erreur chargement agenda");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [date]);

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

  const createNewAppointment = () => {
    const start = formatGoogleDate(date, 8, 0);
    const end = formatGoogleDate(date, 9, 0);
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${start}/${end}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const openGoogle = (url: string) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main style={styles.page}>
      <section style={styles.widget}>
        <div style={styles.topBar}>
          <div style={styles.titleRow}>
            <span style={styles.calendarIcon}>🗓️</span>
            <h1 style={styles.title}>Planning - Aujourd&apos;hui</h1>
          </div>

          <div style={styles.rightHeader}>
            <button style={styles.newButton} onClick={createNewAppointment}>
              + Nouveau RDV
            </button>

            <div style={styles.navGroup}>
              <button onClick={previousDay} style={styles.navButton}>‹</button>
              <span style={styles.dayPill}>{dayLabel}</span>
              <button onClick={nextDay} style={styles.navButton}>›</button>
            </div>
          </div>
        </div>

        {loading && <div style={styles.infoState}>Chargement des rendez-vous…</div>}
        {!loading && error && <div style={styles.errorState}>{error}</div>}
        {!loading && !error && events.length === 0 && (
          <div style={styles.infoState}>Aucun rendez-vous pour ce jour.</div>
        )}

        {!loading && !error && events.length > 0 && (
          <div style={styles.rowsWrap}>
            {events.map((item, i) => {
              const p = parseTitle(item.title);
              const accent = ACCENTS[i % ACCENTS.length];

              return (
                <div key={i} style={styles.row}>
                  <div style={styles.timeCard}>{item.time}</div>

                  <div style={styles.inlineInfo}>
                    <span style={styles.clientBig}>{p.client || "Sans nom"}</span>

                    <div style={styles.metaInline}>
                      <span style={{ ...styles.plateMarker, background: accent }} />
                      <span style={styles.plate}>{p.plate || "-"}</span>
                      <span style={styles.separator}>|</span>
                      <span style={styles.phoneWrap}>
                        <span style={styles.phoneIcon}>📞</span>
                        <span style={styles.phone}>{formatPhone(p.phone || "") || "-"}</span>
                      </span>
                      <span
                        style={{
                          ...styles.fadeLine,
                          background: `linear-gradient(90deg, ${accent}, rgba(255,255,255,0))`,
                        }}
                      />
                    </div>
                  </div>

                  <div style={styles.actions}>
                    <span
                      style={{
                        ...styles.interventionBadge,
                        color: accent,
                        border: `1px solid ${accent}33`,
                        background: `${accent}14`,
                      }}
                    >
                      {p.intervention || "Intervention"}
                    </span>

                    <button
                      type="button"
                      style={styles.moreButton}
                      onClick={() => openGoogle(item.url)}
                      title="Ouvrir dans Google Agenda"
                      aria-label="Ouvrir dans Google Agenda"
                    >
                      ⋯
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    padding: "8px 10px",
    margin: 0,
    background: "transparent",
    fontFamily:
      'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    color: "#191919",
  },
  widget: {
    maxWidth: 1160,
    margin: "0 auto",
    background: "#ffffff",
    border: "1px solid #e9e7e3",
    borderRadius: 16,
    padding: 14,
    boxShadow: "0 1px 2px rgba(15, 23, 42, 0.03)",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 14,
    marginBottom: 14,
    flexWrap: "wrap",
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  calendarIcon: {
    fontSize: 23,
  },
  title: {
    margin: 0,
    fontSize: 22,
    fontWeight: 700,
    color: "#191919",
    letterSpacing: -0.3,
  },
  rightHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  newButton: {
    height: 40,
    borderRadius: 12,
    border: "1px solid #e2e0db",
    background: "#ffffff",
    color: "#2563eb",
    padding: "0 14px",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
  },
  navGroup: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  navButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    border: "1px solid #e2e0db",
    background: "#ffffff",
    color: "#334155",
    fontSize: 22,
    cursor: "pointer",
    lineHeight: 1,
  },
  dayPill: {
    height: 38,
    display: "inline-flex",
    alignItems: "center",
    padding: "0 14px",
    borderRadius: 12,
    background: "#ffffff",
    border: "1px solid #e2e0db",
    color: "#191919",
    fontWeight: 700,
    whiteSpace: "nowrap",
    fontSize: 14,
  },
  rowsWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "128px 1fr auto",
    alignItems: "center",
    gap: 14,
    background: "#ffffff",
    border: "1px solid #e9e7e3",
    borderRadius: 14,
    padding: 14,
  },
  timeCard: {
    height: 62,
    borderRadius: 14,
    background: "#f7f6f3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#191919",
    fontWeight: 700,
    fontSize: 18,
    whiteSpace: "nowrap",
  },
  inlineInfo: {
    minWidth: 0,
    display: "flex",
    alignItems: "center",
    gap: 18,
  },
  clientBig: {
    fontWeight: 700,
    fontSize: 17,
    color: "#191919",
    whiteSpace: "nowrap",
    minWidth: 88,
  },
  metaInline: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    minWidth: 0,
    overflow: "hidden",
    position: "relative",
    flex: 1,
    paddingBottom: 6,
  },
  plateMarker: {
    width: 5,
    height: 24,
    borderRadius: 999,
    flexShrink: 0,
  },
  plate: {
    color: "#3f4b62",
    fontWeight: 800,
    fontSize: 15,
    letterSpacing: 0.4,
    whiteSpace: "nowrap",
  },
  separator: {
    color: "#9aa3b2",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
  phoneWrap: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    whiteSpace: "nowrap",
  },
  phoneIcon: {
    fontSize: 14,
    lineHeight: 1,
  },
  phone: {
    color: "#657188",
    fontWeight: 600,
    fontSize: 14,
  },
  fadeLine: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: 124,
    height: 4,
    borderRadius: 999,
    opacity: 0.9,
    pointerEvents: "none",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  interventionBadge: {
    padding: "9px 14px",
    borderRadius: 14,
    fontWeight: 700,
    fontSize: 14,
    whiteSpace: "nowrap",
  },
  moreButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    border: "1px solid #e2e0db",
    background: "#ffffff",
    color: "#64748b",
    fontSize: 22,
    cursor: "pointer",
    lineHeight: 1,
  },
  infoState: {
    padding: "16px 12px",
    color: "#667085",
    fontSize: 14,
  },
  errorState: {
    padding: "16px 12px",
    color: "#b42318",
    fontSize: 14,
    background: "#fef3f2",
    border: "1px solid #fecdca",
    borderRadius: 12,
  },
};
