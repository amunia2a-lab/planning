"use client";

import { useState } from "react";
import { parseTitle } from "../lib/parse";

const data = [
  { time: "08:30", title: "AB-124-GD | Colin | 0612345678 | Embrayage", accent: "#3b82f6", googleUrl: "https://calendar.google.com" },
  { time: "10:00", title: "EF-456-HJ | Martin | 06 98 45 12 33 | Révision", accent: "#f59e0b", googleUrl: "https://calendar.google.com" }
];

export default function Page() {
  const [date, setDate] = useState(new Date());

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

  const formatDay = () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Aujourd'hui";
    if (date.toDateString() === tomorrow.toDateString()) return "Demain";

    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
  };

  const openGoogle = (url) => {
    window.location.href = url;
  };

  return (
    <main style={styles.page}>
      <section style={styles.widget}>

        <div style={styles.topBar}>
          <button style={styles.newButton}>+ Nouveau RDV</button>

          <div style={styles.navGroup}>
            <button onClick={previousDay} style={styles.navButton}>‹</button>
            <span style={styles.day}>{formatDay()}</span>
            <button onClick={nextDay} style={styles.navButton}>›</button>
          </div>
        </div>

        {data.map((item,i)=>{
          const p = parseTitle(item.title);

          return (
            <div key={i} style={styles.row}>
              <div style={styles.time}>{item.time}</div>

              <div>
                <div style={styles.client}>{p.client}</div>
                <div style={styles.meta}>
                  <span style={{...styles.bar, background:item.accent}}/>
                  {p.plate} | 📞 {p.phone}
                </div>
              </div>

              <div style={styles.right}>
                <span style={styles.badge}>{p.intervention}</span>
                <button onClick={()=>openGoogle(item.googleUrl)}>⋯</button>
              </div>
            </div>
          )
        })}
      </section>
    </main>
  );
}

const styles = {
  page:{
    background:"transparent",
    padding:20,
    minHeight:"100vh"
  },
  widget:{
    maxWidth:900,
    margin:"0 auto",
    background:"#fff",
    borderRadius:20,
    padding:20
  },
  topBar:{
    display:"flex",
    justifyContent:"space-between",
    marginBottom:20
  },
  newButton:{
    padding:"10px 14px",
    borderRadius:10,
    border:"1px solid #ddd",
    cursor:"pointer"
  },
  navGroup:{
    display:"flex",
    gap:10,
    alignItems:"center"
  },
  navButton:{
    padding:"6px 10px",
    cursor:"pointer"
  },
  day:{fontWeight:700},
  row:{
    display:"grid",
    gridTemplateColumns:"100px 1fr auto",
    padding:12,
    border:"1px solid #eee",
    borderRadius:12,
    marginBottom:10
  },
  time:{fontWeight:700},
  client:{fontWeight:800},
  meta:{display:"flex",gap:8,alignItems:"center"},
  bar:{width:5,height:20},
  right:{display:"flex",gap:10,alignItems:"center"},
  badge:{padding:"5px 10px",border:"1px solid #ddd",borderRadius:8}
};
