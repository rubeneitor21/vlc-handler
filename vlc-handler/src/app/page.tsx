"use client"

import Image from "next/image";
import { encode } from "punycode";
import { useEffect, useState } from 'react'

export default function Home() {

  const [mediaInfo, setMediaInfo] = useState({} as any)

  useEffect(() => {
    async function updateInfo() {
      try {
        const data = await (await fetch("http://" + location.hostname + ":8080/requests/status.json", {
          headers: {
            Authentication: `Basic ${btoa(":Garcalia$10")}`
          }
        })).json()
        setMediaInfo(data)
      }

      catch {
        setMediaInfo({} as any) 
      }
    }

    updateInfo()
  })

  return (
    <>
      <main className="flex items-center justify-center h-[100vh] bg-gray-950">
        <div className="text-black bg-gray-50 rounded w-[80%] h-auto aspect-[9/16] sm:aspect-[16/9]">
          {
            Object.keys(mediaInfo).length == 0 ?
              <div className="text-center">Esperando conexion...</div>
              :
              <>Ahora completo xd</>
          }
        </div>
      </main>

      <footer className="fixed bottom-0 text-right">
        <div className="text-white text-center w-[100vw]">
          Algo no funciona? prueba la <a className="underline" href={"http://" + location.hostname + ":8080"} target="_blank">pagina oficial</a>
        </div>
      </footer>
    </>
  );
}
