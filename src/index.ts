import {WebSocket} from 'ws'


const ws = new WebSocket('wss://gotify.gp-softwaretechnik.at/stream?token=CkAA8psxiIpB.EM')

ws.on("open", () => {
    console.log("WebSocket opened.")
})


ws.on("message", (data) => {
    console.log("Message received: %s", data)
})

ws.on("close", () => {
    console.log("WebSocket closed.")
})

ws.on("error", (error) => {
    console.error("WebSocket error: %s", error)
})
