type Appointment = {
  id: string;
  time: string;
  model: string;
  plate: string;
  client: string;
  phone: string;
  intervention: string;
  accent: string;
};

const data: Appointment[] = [
  {
    id: "1",
    time: "08:30",
    model: "Peugeot 208",
    plate: "AB-124-GD",
    client: "Colin",
    phone: "06 12 34 56 78",
    intervention: "Embrayage",
    accent: "#3b82f6"
  },
  {
    id: "2",
    time: "10:00",
    model: "Renault Clio 4",
    plate: "EF-456-HJ",
    client: "Martin",
    phone: "06 98 45 12 33",
    intervention: "Révision",
    accent: "#f59e0b"
  }
];

export default function Page() {
  return (
    <main style={styles.page}>
      <div style={styles.container}>
        {data.map(item => (
          <div key={item.id} style={styles.row}>

            <div style={styles.time}>{item.time}</div>

            <div style={styles.car}>🚗</div>

            <div style={styles.info}>

              <div style={styles.modelWrap}>
                <span style={styles.model}>{item.model}</span>
                <span style={{...styles.fade, background: item.accent}}/>
              </div>

              <div style={styles.meta}>
                <span style={{...styles.bar, background: item.accent}}/>
                <span style={styles.plate}>{item.plate}</span>
                <span style={styles.client}>{item.client}</span>
                <span style={styles.phone}>📞 {item.phone}</span>
              </div>

            </div>

            <div style={{...styles.badge, color: item.accent}}>
              {item.intervention}
            </div>

          </div>
        ))}
      </div>
    </main>
  );
}

const styles: any = {
  page: { padding: 30, fontFamily: "sans-serif" },
  container: { display: "flex", flexDirection: "column", gap: 20 },

  row: {
    display: "grid",
    gridTemplateColumns: "100px 60px 1fr 150px",
    alignItems: "center",
    gap: 20,
    padding: 20,
    borderRadius: 20,
    background: "#fff",
    border: "1px solid #eee"
  },

  time: { fontWeight: 700 },
  car: { fontSize: 30 },

  info: { display: "flex", flexDirection: "column", gap: 8 },

  modelWrap: { display: "flex", flexDirection: "column" },
  model: { fontWeight: 700 },
  fade: { height: 4, width: 120, borderRadius: 10, opacity: 0.6 },

  meta: { display: "flex", alignItems: "center", gap: 12 },

  bar: { width: 6, height: 24, borderRadius: 10 },

  plate: { fontWeight: 900, letterSpacing: 1 },
  client: { fontWeight: 700 },
  phone: { color: "#555" },

  badge: {
    padding: "8px 14px",
    borderRadius: 12,
    border: "1px solid #ddd"
  }
};
