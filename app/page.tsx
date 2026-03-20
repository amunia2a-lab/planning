type Appointment = {
  id: string;
  time: string;
  model: string;
  plate: string;
  client: string;
  intervention: string;
};

const appointments: Appointment[] = [
  {
    id: "1",
    time: "08:30",
    model: "Peugeot 208",
    plate: "AB-124-GD",
    client: "Colin",
    intervention: "Embrayage",
  },
  {
    id: "2",
    time: "10:00",
    model: "Renault Clio 4",
    plate: "EF-456-HJ",
    client: "Martin",
    intervention: "Révision",
  },
  {
    id: "3",
    time: "14:00",
    model: "Audi A3",
    plate: "GH-782-KL",
    client: "Dupont",
    intervention: "Diagnostic",
  },
  {
    id: "4",
    time: "16:00",
    model: "BMW Série 1",
    plate: "JK-903-MN",
    client: "Lucas",
    intervention: "Freinage",
  },
];

export default function Page() {
  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <section style={styles.widget}>
          <div style={styles.topBar}>
            <div style={styles.leftHeader}>
              <button style={styles.newButton}>+ Nouveau RDV</button>

              <div style={styles.navGroup}>
                <button style={styles.navButton}>‹</button>
                <span style={styles.dayPill}>Aujourd'hui</span>
                <button style={styles.navButton}>›</button>
              </div>
            </div>

            <div style={styles.titleRow}>
              <span style={styles.calendarIcon}>📅</span>
              <h1 style={styles.title}>Planning - Aujourd&apos;hui</h1>
            </div>
          </div>

          <div style={styles.rowsWrap}>
            {appointments.map((item) => (
              <div key={item.id} style={styles.row}>
                <div style={styles.timeCard}>{item.time}</div>

                <div style={styles.carThumb}>🚗</div>

                <div style={styles.inlineInfo}>
                  <span style={styles.model}>{item.model}</span>
                  <span style={styles.separator}>|</span>
                  <span style={styles.metaText}>{item.plate}</span>
                  <span style={styles.metaText}>{item.client}</span>
                </div>

                <div style={styles.actions}>
                  <span style={styles.interventionBadge}>{item.intervention}</span>
                  <button style={styles.moreButton}>⋯</button>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.bottomStats}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>🔧</div>
              <div>
                <div style={styles.statValue}>{appointments.length}</div>
                <div style={styles.statLabel}>Interventions</div>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIcon}>🚘</div>
              <div>
                <div style={styles.statValue}>4</div>
                <div style={styles.statLabel}>Véhicules</div>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIcon}>🗓️</div>
              <div>
                <div style={styles.statValue}>Aujourd&apos;hui</div>
                <div style={styles.statLabel}>Vue active</div>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIcon}>✅</div>
              <div>
                <div style={styles.statValue}>4</div>
                <div style={styles.statLabel}>Prévues</div>
              </div>
            </div>
          </div>
        </section>
      </div>
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
    marginBottom: 22,
    flexWrap: "wrap",
  },
  leftHeader: {
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
  inlineInfo: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    flex: 1,
    flexWrap: "nowrap",
    overflow: "hidden",
    whiteSpace: "nowrap",
    minWidth: 0,
  },
  model: {
    fontWeight: 700,
    fontSize: 18,
    color: "#0f172a",
  },
  separator: {
    color: "#cbd5e1",
    fontWeight: 700,
  },
  metaText: {
    color: "#475569",
    fontWeight: 600,
    fontSize: 15,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  interventionBadge: {
    padding: "10px 16px",
    borderRadius: 16,
    background: "#dbeafe",
    color: "#1d4ed8",
    fontWeight: 700,
    fontSize: 14,
    whiteSpace: "nowrap",
    border: "1px solid #bfdbfe",
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
  bottomStats: {
    marginTop: 24,
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 16,
  },
  statCard: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    background: "rgba(255,255,255,0.88)",
    border: "1px solid #e5e7eb",
    borderRadius: 24,
    padding: "18px 20px",
    minHeight: 108,
  },
  statIcon: {
    fontSize: 28,
  },
  statValue: {
    fontSize: 34,
    fontWeight: 900,
    color: "#0f172a",
    lineHeight: 1,
  },
  statLabel: {
    marginTop: 6,
    fontSize: 15,
    color: "#64748b",
    fontWeight: 600,
  },
};
