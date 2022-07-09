import {GotifyWebSocket} from "./gotify-websocket.js"


async function main() {
    console.debug("Gotify-WebHook-Gateway is starting...")
    GotifyWebSocket.wsConnect()
}


await main()
