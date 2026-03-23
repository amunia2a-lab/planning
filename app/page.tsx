import { parseTitle } from "../lib/parse";

const data = [
  { time: "08:30", title: "AB-124-GD | Colin | 0612345678 | Embrayage", accent: "#3b82f6" },
  { time: "10:00", title: "EF-456-HJ | Martin | 06 98 45 12 33 | Révision", accent: "#f59e0b" }
];

export default function Page() {
  return (
    <main style={styles.page}>
      <section style={styles.widget}>
        <h1 style={styles.title}>Planning - Aujourd'hui</h1>

        <div style={styles.rowsWrap}>
          {data.map((item, i) => {
            const p = parseTitle(item.title);

            return (
              <div key={i} style={styles.row}>
                <div style={styles.time}>{item.time}</div>
                <div style={styles.car}>🚗</div>

                <div>
                  <div style={styles.client}>{p.client}</div>

                  <div style={styles.meta}>
                    <span style={{...styles.bar, background:item.accent}}/>
                    <span style={styles.plate}>{p.plate}</span>
                    <span>|</span>
                    <span>📞 {p.phone}</span>
                  </div>
                </div>

                <div style={{...styles.badge, color:item.accent}}>
                  {p.intervention}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

const styles:any = {
  page:{padding:30,background:"#f6f8fc"},
  widget:{maxWidth:900,margin:"0 auto",background:"#fff",padding:20,borderRadius:20},
  title:{fontSize:24,fontWeight:800,marginBottom:20},
  rowsWrap:{display:"flex",flexDirection:"column",gap:12},
  row:{display:"grid",gridTemplateColumns:"100px 60px 1fr auto",alignItems:"center",gap:16,padding:16,border:"1px solid #eee",borderRadius:16},
  time:{fontWeight:800},
  car:{fontSize:28},
  client:{fontSize:18,fontWeight:800},
  meta:{display:"flex",gap:10,alignItems:"center"},
  bar:{width:5,height:20,borderRadius:10},
  plate:{fontWeight:700},
  badge:{padding:"6px 10px",borderRadius:10,border:"1px solid #ddd"}
};
