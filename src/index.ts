import {WebSocket} from "ws"
import {env} from "process"


class GotifyWebSocket extends WebSocket {

    private baseUrl: string
    private token: string


    constructor(baseUrl: string, token: string) {

        if (baseUrl.endsWith("/")) {
            baseUrl.slice(0, -1)
        }

        super(`${baseUrl}/stream`, {
            headers: {
                "X-Gotify-Key": token
            }
        })

        this.baseUrl = baseUrl
        this.token = token


        this.on("open", () => {
            console.log("WebSocket opened. xxx YYY")
        })

        this.on("message", (data) => {
            console.log("Message received: %s", data)
        })


        this.on("close", () => {
            console.log("WebSocket closed.")
        })


        this.on("error", (error) => {
            console.error("WebSocket error: %s", error)
        })

    }


}


const baseUrl = "wss://gotify.gp-softwaretechnik.at"
const token = "CkAA8psxiIpB.EM"

// Start
new GotifyWebSocket(baseUrl, token)

