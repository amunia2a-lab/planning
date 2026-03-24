"use client";

import { useState, useEffect } from "react";
import { parseTitle } from "../lib/parse";

const data = [
  { time: "08:30", title: "AB-124-GD | Colin | 0612345678 | Embrayage", accent: "#3b82f6", googleUrl: "https://calendar.google.com" },
  { time: "10:00", title: "EF-456-HJ | Martin | 06 98 45 12 33 | Révision", accent: "#f59e0b", googleUrl: "https://calendar.google.com" }
];

export default function Page() {
  const [date, setDate] = useState(new Date());
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(prefersDark);
  }, []);

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
      padding: 16,
      background: dark ? "#191919" : "#ffffff",
      color: dark ? "#fff" : "#000",
      minHeight: "100vh",
      fontFamily: "Inter, sans-serif"
    }}>
      <div style={{maxWidth: 900, margin: "0 auto"}}>

        <div style={{display:"flex", justifyContent:"space-between", marginBottom:20}}>
          <button style={btn}>+ Nouveau RDV</button>

          <div style={{display:"flex", gap:10, alignItems:"center"}}>
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
              gridTemplateColumns:"80px 1fr auto",
              padding:12,
              borderRadius:12,
              marginBottom:10,
              border: dark ? "1px solid #333" : "1px solid #eee"
            }}>
              <div>{item.time}</div>

              <div>
                <div style={{fontWeight:700}}>{p.client}</div>
                <div style={{fontSize:13, opacity:0.7}}>
                  {p.plate} | 📞 {p.phone}
                </div>
              </div>

              <div style={{display:"flex", gap:10}}>
                <span style={{
                  border:"1px solid #ccc",
                  padding:"4px 8px",
                  borderRadius:8
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
  padding:"8px 12px",
  borderRadius:8,
  border:"1px solid #ddd",
  cursor:"pointer"
};
