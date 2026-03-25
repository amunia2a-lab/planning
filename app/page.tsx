"use client";

import { useEffect, useState } from "react";
import { parseTitle } from "../lib/parse";

export default function Page() {
  const [events, setEvents] = useState([]);

  useEffect(()=>{
    fetch("/api/events")
      .then(r=>r.json())
      .then(setEvents);
  },[]);

  return (
    <main style={{padding:10}}>
      {events.map((e,i)=>{
        const p = parseTitle(e.title);
        return (
          <div key={i} style={{
            display:"flex",
            justifyContent:"space-between",
            padding:10,
            border:"1px solid #eee",
            borderRadius:10,
            marginBottom:8
          }}>
            <div>
              <strong>{p.client}</strong><br/>
              {p.plate} | {p.phone}
            </div>
            <div>
              {p.intervention}
              <button onClick={()=>window.open(e.url)}>⋯</button>
            </div>
          </div>
        )
      })}
    </main>
  );
}