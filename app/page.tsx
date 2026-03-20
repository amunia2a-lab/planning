type Appointment = {
  id: string;
  time: string;
  model: string;
  plate: string;
  client: string;
  intervention: string;
  accent: string;
};

const appointments: Appointment[] = [
  {
    id: "1",
    time: "08:30",
    model: "Peugeot 208",
    plate: "AB-124-GD",
    client: "Colin",
    intervention: "Embrayage",
    accent: "#3b82f6",
  },
  {
    id: "2",
    time: "10:00",
    model: "Renault Clio 4",
    plate: "EF-456-HJ",
    client: "Martin",
    intervention: "Révision",
    accent: "#f59e0b",
  },
  {
    id: "3",
    time: "14:00",
    model: "Audi A3",
    plate: "GH-782-KL",
    client: "Dupont",
    intervention: "Diagnostic",
    accent: "#8b5cf6",
  },
  {
    id: "4",
    time: "16:00",
    model: "BMW Série 1",
    plate: "JK-903-MN",
    client: "Lucas",
    intervention: "Freinage",
    accent: "#10b981",
  }
];

export default function Page() {
  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <section style={styles.widget}>
          <div style={styles.topBar}>
            <div style={styles.titleRow}>
              <span style={styles.calendarIcon}>📅</span>
              <h1 style={styles.title}>Planning - Aujourd&apos;hui</h1>
            </div>

            <div style={styles.rightHeader}>
              <button style={styles.newButton}>+ Nouveau RDV</button>

              <div style={styles.navGroup}>
                <button style={styles.navButton}>‹</button>
                <span style={styles.dayPill}>Aujourd&apos;hui</span>
                <button style={styles.navButton}>›</button>
              </div>
            </div>
          </div>

          <div style={styles.summaryWrap}>
            <div style={styles.summaryBar}>
              <SummaryCard icon="🔧" title="Interventions" value="4" />
              <SummaryCard icon="🚗" title="Véhicules" value="4" />
              <SummaryCard icon="✅" title="Prévues" value="4" />
            </div>
          </div>

          <div style={styles.rowsWrap}>
            {appointments.map((item) => (
              <div key={item.id} style={styles.row}>
                <div style={styles.timeCard}>{item.time}</div>

                <div style={styles.carThumb}>🚗</div>

                <div style={styles.infoBlock}>
                  <div style={styles.infoTop}>
                    <div style={styles.modelWrap}>
                      <span style={styles.model}>{item.model}</span>
                      <span
                        style={{
                          ...styles.modelFade,
                          background: `linear-gradient(90deg, ${item.accent}, rgba(255,255,255,0))`,
                        }}
                      />
                    </div>

                    <div style={styles.metaRow}>
                      <span
                        style={{
                          ...styles.plateMarker,
                          background: item.accent,
                        }}
                      />
                      <span style={styles.plate}>{item.plate}</span>
                      <span style={styles.client}>{item.client}</span>
                    </div>
                  </div>
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
                    {item.intervention}
                  </span>
                  <button style={styles.moreButton}>⋯</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function SummaryCard({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: string;
}) {
  return (
    <div style={styles.summaryCard}>
      <div style={styles.summaryTitleRow}>
        <span style={styles.summaryIcon}>{icon}</span>
        <span style={styles.summaryTitle}>{title}</span>
      </div>
      <div style={styles.summaryValue}>{value}</div>
    </div>
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
  shell: {
    maxWidth: 1280,
    margin: "0 auto",
  },
  widget: {
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
  summaryWrap: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 20,
  },
  summaryBar: {
    width: "100%",
    maxWidth: 900,
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 16,
    padding: 18,
    background: "rgba(255,255,255,0.82)",
    border: "1px solid #e5e7eb",
    borderRadius: 24,
    boxShadow: "0 12px 28px rgba(15, 23, 42, 0.05)",
  },
  summaryCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 18,
    padding: "18px 20px",
    minHeight: 90,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  summaryTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  summaryIcon: {
    fontSize: 20,
    lineHeight: 1,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: "#334155",
  },
  summaryValue: {
    marginTop: 6,
    fontSize: 36,
    lineHeight: 1,
    fontWeight: 900,
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
    whiteSpace: "nowrap",
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
  infoTop: {
    display: "flex",
    alignItems: "center",
    gap: 18,
    minWidth: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
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
    width: 92,
    height: 4,
    marginTop: 8,
    borderRadius: 999,
    opacity: 0.9,
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    minWidth: 0,
    overflow: "hidden",
  },
  plateMarker: {
    width: 4,
    height: 24,
    borderRadius: 999,
    flexShrink: 0,
  },
  plate: {
    color: "#334155",
    fontWeight: 800,
    fontSize: 17,
    letterSpacing: 0.2,
  },
  client: {
    color: "#475569",
    fontWeight: 700,
    fontSize: 17,
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
