"use client"

import Image from "next/image";
import { useState, useEffect} from "react"
import { MouseEventHandler } from "react";
// import {useRouter} from 'next/navigation'

export default function Home() {

  const [times, setTimes] = useState({} as any)

  const secondsToHMS = (seconds: number) => new Date(seconds * 1000).toISOString().substr(11, 8);

  function sendButton(action: string) {
    if (action == "") {
      return
    }
    fetch("/api/", {
      method: "POST",
      body: JSON.stringify({ "action": action })
    })
  }

  useEffect(() => {
    async function getTime() {
      let times = await (await fetch("/api/", {
        method: "POST",
        body: JSON.stringify({ "action": "time" })
      })).json()
      setTimes(times.times)

      setTimeout(getTime, 200)
    }
    setTimeout(getTime, 3000)
  }, [])

  return (
    <>
      <main className="flex items-center justify-center h-[100vh] bg-gray-950">
        <div className="text-black text-center bg-gray-50 rounded w-[80%] h-auto aspect-[9/16] sm:aspect-[16/9]"> 
          <span id="time">{secondsToHMS(times?.time || 0)}</span> 
          <meter max={times?.maxTime} min="0" value={times?.time}/>
          <span id="maxTime">{secondsToHMS(times?.maxTime || 0)}</span>
          
          <br/>

          <input className="text-2xl" type="button" x-action="seek-" value="⏪" onClick={async (e) => {
            let action = (e.target as HTMLElement).getAttribute("x-action")
            sendButton(action || "")
          }} />

          <input className="text-2xl" type="button" x-action="pause" value="⏸️" onClick={async (e) => {
            let action = (e.target as HTMLElement).getAttribute("x-action")
            sendButton(action || "")
          }} />

          <input className="text-2xl" type="button" x-action="seek+" value="⏩" onClick={async (e) => {
            let action = (e.target as HTMLElement).getAttribute("x-action")
            sendButton(action || "")
          }} />

          <br/>

          <input className="text-2xl" type="button" x-action="voldown" value="⬇️" onClick={async (e) => {
            let action = (e.target as HTMLElement).getAttribute("x-action")
            sendButton(action || "")
          }} />

          <input className="text-2xl" type="button" x-action="volup" value="⬆️" onClick={async (e) => {
            let action = (e.target as HTMLElement).getAttribute("x-action")
            sendButton(action || "")
          }} />

        </div>
      </main>

      <footer className="fixed bottom-0 text-right">
        <div className="text-white text-center w-[100vw]">
          Algo no funciona? prueba la <a className="underline" href={"http://" + window.location.hostname + ":8080/"} target="_blank">pagina oficial</a>
        </div>
      </footer>
    </>
  );
}
