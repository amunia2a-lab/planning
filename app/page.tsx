type Appointment = {
  id: string;
  time: string;
  model: string;
  plate: string;
  client: string;
  intervention: string;
  status: "En cours" | "En attente" | "Terminé";
};

const appointments: Appointment[] = [
  {
    id: "1",
    time: "08:30",
    model: "Peugeot 208",
    plate: "AB-124-GD",
    client: "Colin",
    intervention: "Embrayage",
    status: "En cours",
  },
  {
    id: "2",
    time: "10:00",
    model: "Renault Clio 4",
    plate: "EF-456-HJ",
    client: "Martin",
    intervention: "Révision",
    status: "En attente",
  },
  {
    id: "3",
    time: "14:00",
    model: "Audi A3",
    plate: "GH-782-KL",
    client: "Dupont",
    intervention: "Diagnostic",
    status: "En cours",
  },
  {
    id: "4",
    time: "16:00",
    model: "BMW Série 1",
    plate: "JK-903-MN",
    client: "Lucas",
    intervention: "Freinage",
    status: "Terminé",
  },
];

export default function Page() {
  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <section style={styles.widget}>
          <div style={styles.topBar}>
            <div style={styles.titleRow}>
              <span style={styles.calendarIcon}>📅</span>
              <h1 style={styles.title}>Planning - Aujourd'hui</h1>
            </div>

            <div style={styles.topActions}>
              <button style={styles.iconButton}>＋</button>
              <button style={styles.iconButton}>⋮</button>
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
                  <span style={styles.plate}>{item.plate}</span>
                  <span style={styles.dot}>•</span>
                  <span style={styles.client}>{item.client}</span>
                  <span style={styles.dot}>•</span>
                  <span style={styles.intervention}>{item.intervention}</span>
                </div>

                <div style={styles.statusArea}>
                  <StatusBadge status={item.status} />
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
                <div style={styles.statValue}>2</div>
                <div style={styles.statLabel}>En cours</div>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIcon}>⏰</div>
              <div>
                <div style={styles.statValue}>1</div>
                <div style={styles.statLabel}>En attente</div>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIcon}>✅</div>
              <div>
                <div style={styles.statValue}>1</div>
                <div style={styles.statLabel}>Terminée</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: Appointment["status"] }) {
  const stylesMap: Record<Appointment["status"], React.CSSProperties> = {
    "En cours": {
      background: "#e8f3ff",
      color: "#2563eb",
      border: "1px solid #bfdbfe",
    },
    "En attente": {
      background: "#fff1df",
      color: "#b45309",
      border: "1px solid #fcd34d",
    },
    "Terminé": {
      background: "#eaf8ef",
      color: "#15803d",
      border: "1px solid #bbf7d0",
    },
  };

  return <span style={{ ...styles.badge, ...stylesMap[status] }}>{status}</span>;
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
    gap: 16,
    marginBottom: 22,
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
  topActions: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  iconButton: {
    width: 52,
    height: 52,
    borderRadius: 18,
    border: "1px solid #e2e8f0",
    background: "rgba(255,255,255,0.9)",
    color: "#334155",
    fontSize: 24,
    boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)",
    cursor: "pointer",
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
    gap: 10,
    flex: 1,
    flexWrap: "nowrap",
    overflow: "hidden",
    whiteSpace: "nowrap",
    minWidth: 0,
  },
  model: {
    fontWeight: 800,
    fontSize: 24,
    color: "#0f172a",
  },
  plate: {
    fontWeight: 700,
    color: "#1d4ed8",
    fontSize: 16,
  },
  client: {
    color: "#334155",
    fontWeight: 600,
    fontSize: 16,
  },
  intervention: {
    color: "#64748b",
    fontWeight: 600,
    fontSize: 16,
  },
  separator: {
    color: "#cbd5e1",
    fontWeight: 700,
  },
  dot: {
    color: "#94a3b8",
    fontWeight: 700,
  },
  statusArea: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 126,
    padding: "12px 16px",
    borderRadius: 18,
    fontSize: 16,
    fontWeight: 800,
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
