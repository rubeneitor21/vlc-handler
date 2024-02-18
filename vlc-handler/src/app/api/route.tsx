import { NextResponse, NextRequest } from "next/server"
import * as net from 'net'
import { argv0 } from "process"
import { ok } from "assert"

const sleep = (ms: any) => new Promise(r => setTimeout(r, ms))

let ready = false
let time = ""
let maxTime = ""
let socket: any
let lastCmd: string

export async function POST(req: NextRequest) {
  if (!ready) {
    socket = net.createConnection(4212, "localhost", () => {
      console.log("Conectado")
      socket.write("Garcalia$10\r\n")
      ready = true
    })

    socket.on("data", (d: any) => {
      // console.log("Data: " + d.toString())
      if (d.toString().match(/\d+/)) {
        if (lastCmd == "get_time") {
          time = d.toString().match(/\d+/)[0]
          // console.log(time)
        }
        else if (lastCmd == "get_length") {
          maxTime = d.toString().match(/\d+/)[0]
        }
      }
      // console.log(time)
    })

    await sleep(500)
  }
  const iJson = await req.json()

  // console.log(iJson)

  if (iJson["action"] == "pause") {
    socket.write("pause\r\n")
  }
  else if (iJson["action"] == "seek+") {
    socket.write("seek +10\r\n")
  }
  else if (iJson["action"] == "seek-") {
    socket.write("seek -10\r\n")
  }
  else if (iJson["action"] == "volup") {
    socket.write("volup 5\r\n")
  }
  else if (iJson["action"] == "voldown") {
    socket.write("voldown 5\r\n")
  }
  else if (iJson["action"] == "add") {
    socket.write(`add ${iJson["url"]}\r\n`)
  }
  else if (iJson["action"] == "to") {
    socket.write(`seek ${iJson["location"]}%\r\n`)
  }
  else if (iJson["action"] == "time") {
    lastCmd = "get_time"
    socket.write(`get_time\r\n`)
    await sleep(10)
    lastCmd = 'get_length'
    socket.write(`get_length\r\n`)
  }

  // console.log("ya esta")

  return NextResponse.json({
    "times": {
      "time": time,
      "maxTime": maxTime
    }
  })
}

