import { parseTitle } from "../lib/parse";

const data = [
  {
    time: "08:30",
    title: "AB-124-GD | Colin | 0612345678 | Embrayage",
    accent: "#3b82f6",
  },
  {
    time: "10:00",
    title: "EF-456-HJ | Martin | 06 98 45 12 33 | Révision",
    accent: "#f59e0b",
  },
  {
    time: "14:00",
    title: "GH-782-KL | Dupont | 0677541028 | Diagnostic",
    accent: "#8b5cf6",
  },
  {
    time: "16:00",
    title: "JK-903-MN | Lucas | 0655432109 | Freinage",
    accent: "#10b981",
  },
];

export default function Page() {
  return (
    <main style={styles.page}>
      <section style={styles.widget}>
        <div style={styles.topBar}>
          <h1 style={styles.title}>Planning - Aujourd'hui</h1>
        </div>

        <div style={styles.rowsWrap}>
          {data.map((item, i) => {
            const p = parseTitle(item.title);

            return (
              <div key={i} style={styles.row}>
                <div style={styles.timeCard}>{item.time}</div>

                <div style={styles.carThumb}>🚗</div>

                <div style={styles.infoBlock}>
                  <div style={styles.clientBig}>{p.client}</div>

                  <div style={styles.metaRow}>
                    <span style={{ ...styles.plateMarker, background: item.accent }} />
                    <span style={styles.plate}>{p.plate}</span>
                    <span style={styles.separator}>|</span>
                    <span style={styles.phoneWrap}>
                      <span>📞</span>
                      <span>{p.phone}</span>
                    </span>
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

const styles: any = {
  page: {
    minHeight: "100vh",
    padding: 28,
    background: "#f6f8fc",
    fontFamily: "sans-serif",
  },
  widget: {
    maxWidth: 1000,
    margin: "0 auto",
    background: "#fff",
    borderRadius: 20,
    padding: 20,
    border: "1px solid #eee",
  },
  topBar: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 800,
  },
  rowsWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "120px 60px 1fr auto",
    gap: 16,
    alignItems: "center",
    padding: 16,
    border: "1px solid #eee",
    borderRadius: 16,
  },
  timeCard: {
    fontWeight: 800,
  },
  carThumb: {
    fontSize: 28,
  },
  infoBlock: {},
  clientBig: {
    fontSize: 18,
    fontWeight: 800,
    marginBottom: 6,
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  plateMarker: {
    width: 5,
    height: 20,
    borderRadius: 10,
  },
  plate: {
    fontWeight: 700,
  },
  separator: {
    opacity: 0.5,
  },
  phoneWrap: {
    display: "flex",
    gap: 6,
    alignItems: "center",
    color: "#555",
  },
  actions: {},
  interventionBadge: {
    padding: "6px 10px",
    borderRadius: 10,
    fontWeight: 600,
  },
};
