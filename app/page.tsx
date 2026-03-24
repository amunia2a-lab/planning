"use client";

import { useState } from "react";
import { parseTitle } from "../lib/parse";

const data = [
  { time: "08:30", title: "AB-124-GD | Colin | 0612345678 | Embrayage", accent: "#3b82f6" },
  { time: "10:00", title: "EF-456-HJ | Martin | 06 98 45 12 33 | Révision", accent: "#f59e0b" }
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
    if (date.toDateString() === today.toDateString()) return "Aujourd'hui";
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
  };

  return (
    <main style={{
      padding: 10,
      background: "transparent",
      minHeight: "100vh",
      fontFamily: "Inter, sans-serif"
    }}>
      <div style={{maxWidth: 800, margin: "0 auto"}}>

        <div style={{display:"flex", justifyContent:"space-between", marginBottom:12}}>
          <button style={btn}>+ Nouveau RDV</button>

          <div style={{display:"flex", gap:8, alignItems:"center"}}>
            <button onClick={previousDay}>‹</button>
            <strong>{formatDay()}</strong>
            <button onClick={nextDay}>›</button>
          </div>
        </div>

        {data.map((item,i)=>{
          const p = parseTitle(item.title);

          return (
            <div key={i} style={{
              display:"grid",
              gridTemplateColumns:"70px 1fr auto",
              padding:"10px 12px",
              borderRadius:10,
              marginBottom:8,
              background:"rgba(255,255,255,0.7)",
              backdropFilter:"blur(6px)",
              border:"1px solid rgba(0,0,0,0.05)"
            }}>
              <div>{item.time}</div>

              <div>
                <div style={{fontWeight:700}}>{p.client}</div>
                <div style={{fontSize:12, opacity:0.7}}>
                  {p.plate} | 📞 {p.phone}
                </div>
              </div>

              <div style={{display:"flex", gap:8}}>
                <span style={{
                  padding:"4px 8px",
                  borderRadius:6,
                  fontSize:12,
                  background:"#eee"
                }}>
                  {p.intervention}
                </span>
                <button>⋯</button>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  );
}

const btn = {
  padding:"6px 10px",
  borderRadius:6,
  border:"1px solid #ddd",
  background:"white",
  cursor:"pointer"
};
