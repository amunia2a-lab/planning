\"use client\";

import { useState } from "react";
import { parseTitle } from "@/lib/parse";

const data = [
  {
    time: "08:30",
    model: "",
    title: "AB-124-GD | Colin | 0612345678 | Embrayage",
    accent: "#3b82f6",
  },
  {
    time: "10:00",
    model: "",
    title: "EF-456-HJ | Martin | 06 98 45 12 33 | Révision",
    accent: "#f59e0b",
  },
];

export default function Page() {
  const [results, setResults] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  async function fetchModel(plate: string) {
    setLoading((s) => ({ ...s, [plate]: true }));
    try {
      const res = await fetch(`/api/vehicle?plate=${encodeURIComponent(plate)}`);
      const json = await res.json();
      setResults((s) => ({
        ...s,
        [plate]: json.fullModel || json.model || json.brand || "Véhicule inconnu",
      }));
    } catch {
      setResults((s) => ({ ...s, [plate]: "Erreur lookup" }));
    } finally {
      setLoading((s) => ({ ...s, [plate]: false }));
    }
  }

  return (
    <main style={styles.page}>
      <section style={styles.widget}>
        <div style={styles.topBar}>
          <div style={styles.titleRow}>
            <span style={styles.calendarIcon}>📅</span>
            <h1 style={styles.title}>Planning - Aujourd&apos;hui</h1>
          </div>
        </div>

        <div style={styles.rowsWrap}>
          {data.map((item, i) => {
            const p = parseTitle(item.title);
            const model = results[p.plate] || item.model || "Modèle à récupérer";

            return (
              <div key={i} style={styles.row}>
                <div style={styles.timeCard}>{item.time}</div>
                <div style={styles.carThumb}>🚗</div>

                <div style={styles.infoBlock}>
                  <div style={styles.modelWrap}>
                    <span style={styles.model}>{model}</span>
                    <span
                      style={{
                        ...styles.modelFade,
                        background: `linear-gradient(90deg, ${item.accent}, rgba(255,255,255,0))`,
                      }}
                    />
                  </div>

                  <div style={styles.metaRow}>
                    <span style={{ ...styles.plateMarker, background: item.accent }} />
                    <span style={styles.plate}>{p.plate}</span>
                    <span style={styles.separator}>|</span>
                    <span style={styles.client}>{p.client}</span>
                    <span style={styles.phoneWrap}>
                      <span style={styles.phoneIcon}>📞</span>
                      <span style={styles.phone}>{p.phone}</span>
                    </span>
                  </div>
                </div>

                <div style={styles.actions}>
                  <button
                    style={styles.lookupButton}
                    onClick={() => fetchModel(p.plate)}
                    disabled={!!loading[p.plate]}
                  >
                    {loading[p.plate] ? "Recherche..." : "Trouver modèle"}
                  </button>

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
    marginBottom: 18,
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
  },
  rowsWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "140px 72px 1fr auto",
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
  },
  carThumb: {
    width: 72,
    height: 72,
    borderRadius: 22,
    background: "linear-gradient(180deg, #eff6ff, #dbeafe)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 32,
    flexShrink: 0,
  },
  infoBlock: {
    minWidth: 0,
  },
  modelWrap: {
    display: "flex",
    flexDirection: "column",
    minWidth: "fit-content",
  },
  model: {
    fontWeight: 700,
    fontSize: 18,
    color: "#0f172a",
    lineHeight: 1.1,
  },
  modelFade: {
    width: 140,
    height: 5,
    marginTop: 8,
    borderRadius: 999,
    opacity: 0.8,
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
  client: {
    color: "#475569",
    fontWeight: 700,
    fontSize: 17,
    marginRight: 8,
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
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  lookupButton: {
    padding: "10px 14px",
    borderRadius: 14,
    border: "1px solid #dbeafe",
    background: "#eff6ff",
    color: "#2563eb",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
  },
  interventionBadge: {
    padding: "10px 16px",
    borderRadius: 16,
    fontWeight: 700,
    fontSize: 14,
    whiteSpace: "nowrap",
  },
};
