import {WebSocket} from "ws"


export class GotifyWebSocket extends WebSocket {

    constructor(private wsBaseUrl: string, private clientToken: string) {

        // Init WebSocket
        super(`${wsBaseUrl}/stream`, {
            headers: {
                "X-Gotify-Key": clientToken
            }
        })

        // onOpen
        this.on("open", () => {
            console.debug("WebSocket opened.")
        })

        // onClose
        this.on("close", () => {
            console.debug("WebSocket closed.")
        })

        // onError
        this.on("error", (error) => {
            console.error("WebSocket error: %s", error)
        })

    }

}
