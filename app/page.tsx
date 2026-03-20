import { parseTitle } from "../lib/parse"

const data = [
  {
    time: "08:30",
    model: "Peugeot 208",
    title: "AB-124-GD | Colin | 0612345678 | Embrayage",
    accent: "#3b82f6"
  },
  {
    time: "10:00",
    model: "Clio 4",
    title: "EF-456-HJ | Martin | 06 98 45 12 33 | Révision",
    accent: "#f59e0b"
  }
]

export default function Page() {
  return (
    <div style={{ padding: 30 }}>
      {data.map((item, i) => {
        const p = parseTitle(item.title)

        return (
          <div key={i} style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
            padding: 20,
            border: "1px solid #eee",
            borderRadius: 20,
            marginBottom: 10
          }}>

            <div style={{ width: 80 }}>{item.time}</div>

            <div>🚗</div>

            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{item.model}</div>

              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{
                  width: 6,
                  height: 24,
                  background: item.accent,
                  borderRadius: 10
                }}/>

                <div style={{ fontWeight: 900 }}>{p.plate}</div>

                <div>{p.client}</div>

                <div>📞 {p.phone}</div>
              </div>
            </div>

            <div style={{
              border: "1px solid #ddd",
              padding: "6px 12px",
              borderRadius: 10,
              color: item.accent
            }}>
              {p.intervention}
            </div>

          </div>
        )
      })}
    </div>
  )
}
