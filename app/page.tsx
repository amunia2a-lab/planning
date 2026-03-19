type Appointment = {
  id: string;
  time: string;
  plate: string;
  client: string;
  intervention: string;
  status: "En cours" | "À venir" | "Terminé";
};

const appointments: Appointment[] = [
  {
    id: "1",
    time: "08:30",
    plate: "AB-124-GD",
    client: "Colin",
    intervention: "Embrayage",
    status: "En cours",
  },
  {
    id: "2",
    time: "10:00",
    plate: "EF-456-HJ",
    client: "Martin",
    intervention: "Révision",
    status: "À venir",
  },
  {
    id: "3",
    time: "14:00",
    plate: "GH-782-KL",
    client: "Dupont",
    intervention: "Diagnostic",
    status: "À venir",
  },
  {
    id: "4",
    time: "16:00",
    plate: "JK-903-MN",
    client: "Lucas",
    intervention: "Freinage",
    status: "Terminé",
  },
];

export default function Page() {
  return (
    <main style={styles.page}>
      <section style={styles.widget}>
        <div style={styles.header}>
          <div>
            <p style={styles.kicker}>Dashboard garage</p>
            <h1 style={styles.title}>Planning</h1>
            <p style={styles.subtitle}>Rendez-vous du jour</p>
          </div>

          <button style={styles.newButton}>+ Nouveau</button>
        </div>

        <div style={styles.centerWrap}>
          <div style={styles.centerCard}>
            <p style={styles.centerLabel}>Aujourd&apos;hui</p>
            <div style={styles.centerValue}>{appointments.length}</div>
            <p style={styles.centerSub}>Interventions</p>
          </div>
        </div>

        <div style={styles.list}>
          {appointments.map((item) => (
            <div key={item.id} style={styles.row}>
              <div style={styles.timeBox}>{item.time}</div>

              <div style={styles.carIcon}>🚗</div>

              <div style={styles.mainInfo}>
                <div style={styles.topLine}>
                  <span style={styles.plate}>{item.plate}</span>
                  <span style={styles.client}>{item.client}</span>
                </div>
                <p style={styles.intervention}>{item.intervention}</p>
              </div>

              <div style={styles.statusWrap}>
                <StatusBadge status={item.status} />
              </div>

              <button style={styles.menuButton}>⋯</button>
            </div>
          ))}
        </div>

        <div style={styles.footerCard}>
          <div>
            <p style={styles.footerTitle}>Prochain rendez-vous</p>
            <p style={styles.footerText}>
              {appointments[0].time} · {appointments[0].client} ·{" "}
              {appointments[0].intervention}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function StatusBadge({ status }: { status: Appointment["status"] }) {
  const map: Record<Appointment["status"], React.CSSProperties> = {
    "En cours": {
      background: "#fff7ed",
      color: "#c2410c",
      border: "1px solid #fdba74",
    },
    "À venir": {
      background: "#eff6ff",
      color: "#1d4ed8",
      border: "1px solid #93c5fd",
    },
    "Terminé": {
      background: "#ecfdf5",
      color: "#047857",
      border: "1px solid #86efac",
    },
  };

  return <span style={{ ...styles.badge, ...map[status] }}>{status}</span>;
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    margin: 0,
    padding: "32px 20px",
    background:
      "linear-gradient(180deg, #f8fbff 0%, #f1f5f9 45%, #eef4fb 100%)",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  widget: {
    maxWidth: 980,
    margin: "0 auto",
    background: "rgba(255,255,255,0.88)",
    border: "1px solid rgba(255,255,255,0.8)",
    borderRadius: 32,
    padding: 28,
    boxShadow: "0 24px 80px rgba(15, 23, 42, 0.10)",
    backdropFilter: "blur(14px)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 28,
  },
  kicker: {
    margin: 0,
    color: "#94a3b8",
    fontSize: 14,
    fontWeight: 600,
  },
  title: {
    margin: "6px 0 0",
    color: "#0f172a",
    fontSize: 42,
    lineHeight: 1,
    fontWeight: 800,
    letterSpacing: -1,
  },
  subtitle: {
    margin: "10px 0 0",
    color: "#64748b",
    fontSize: 16,
  },
  newButton: {
    border: "1px solid #e2e8f0",
    background: "#ffffff",
    color: "#0f172a",
    padding: "12px 18px",
    borderRadius: 18,
    fontSize: 14,
    fontWeight: 700,
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
    cursor: "pointer",
  },
  centerWrap: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 28,
  },
  centerCard: {
    width: "100%",
    maxWidth: 340,
    borderRadius: 28,
    padding: "24px 20px",
    textAlign: "center",
    background: "linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)",
    border: "1px solid #dbeafe",
    boxShadow: "0 20px 50px rgba(59, 130, 246, 0.10)",
  },
  centerLabel: {
    margin: 0,
    color: "#3b82f6",
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    fontSize: 12,
    fontWeight: 800,
  },
  centerValue: {
    marginTop: 12,
    fontSize: 54,
    lineHeight: 1,
    fontWeight: 900,
    color: "#0f172a",
  },
  centerSub: {
    margin: "8px 0 0",
    color: "#64748b",
    fontSize: 16,
    fontWeight: 600,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 24,
    padding: 16,
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
    flexWrap: "wrap",
  },
  timeBox: {
    minWidth: 82,
    height: 56,
    borderRadius: 18,
    background: "#f8fafc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    color: "#0f172a",
    fontSize: 18,
  },
  carIcon: {
    width: 54,
    height: 54,
    borderRadius: 18,
    background: "#eff6ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    flexShrink: 0,
  },
  mainInfo: {
    flex: 1,
    minWidth: 220,
  },
  topLine: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
  },
  plate: {
    background: "#dbeafe",
    color: "#1d4ed8",
    borderRadius: 12,
    padding: "6px 10px",
    fontSize: 13,
    fontWeight: 800,
  },
  client: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: 700,
  },
  intervention: {
    margin: "6px 0 0",
    color: "#64748b",
    fontSize: 15,
  },
  statusWrap: {
    marginLeft: "auto",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 14px",
    borderRadius: 14,
    fontSize: 14,
    fontWeight: 800,
    whiteSpace: "nowrap",
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    border: "1px solid #e2e8f0",
    background: "#f8fafc",
    color: "#475569",
    fontSize: 22,
    cursor: "pointer",
  },
  footerCard: {
    marginTop: 18,
    borderRadius: 24,
    padding: 18,
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
  },
  footerTitle: {
    margin: 0,
    color: "#0f172a",
    fontSize: 15,
    fontWeight: 700,
  },
  footerText: {
    margin: "6px 0 0",
    color: "#64748b",
    fontSize: 14,
  },
};
