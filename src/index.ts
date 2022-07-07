import {WebSocket} from "ws"
import {env} from "process"
import "dotenv/config"
import axios from "axios"


class Settings {

    httpBaseUrl: string
    wsBaseUrl: string


    constructor(
        private readonly gotifyHostname = (env["GOTIFY_HOSTNAME"] as string).toLowerCase(),
        private gotifyHttps = (env["GOTIFY_HTTPS"] as string).toLowerCase(),
        public clientToken = env["GOTIFY_CLIENT_TOKEN"] as string,
        private app1Name = env["APP_1_NAME"] as string,
        private app1Webhook = env["APP_1_WEBHOOK"] as string,
        private app2Name = env["APP_1_NAME"] as string,
        private app2Webhook = env["APP_1_WEBHOOK"] as string,
        private app3Name = env["APP_1_NAME"] as string,
        private app3Webhook = env["APP_1_WEBHOOK"] as string,
        private app4Name = env["APP_1_NAME"] as string,
        private app4Webhook = env["APP_1_WEBHOOK"] as string,
        private app5Name = env["APP_1_NAME"] as string,
        private app5Webhook = env["APP_1_WEBHOOK"] as string,
        private app6Name = env["APP_1_NAME"] as string,
        private app6Webhook = env["APP_1_WEBHOOK"] as string,
    ) {
        // remove slash
        if (this.gotifyHostname.endsWith("/")) {
            this.gotifyHostname = gotifyHostname.slice(0, -1)
        }
        // use secure URL?
        const https: boolean = (
            this.gotifyHttps === "true" ||
            this.gotifyHttps === "1" ||
            this.gotifyHttps === "yes" ||
            this.gotifyHttps === "on"
        )

        // URL for HTTP requests
        this.httpBaseUrl = `${https ? "https" : "http"}://${this.gotifyHostname}`
        this.wsBaseUrl = `${https ? "ws" : "wss"}://${this.gotifyHostname}`
    }
}


class GotifyHttp {


    private async getRequest() {



        // let user: User = null;
        // try {
        //   const { data } = await axios.get('/user?ID=12345');
        //   user = data.userDetails;
        // } catch (error) {
        //   if (axios.isAxiosError(error)) {
        //     handleAxiosError(error);
        //   } else {
        //     handleUnexpectedError(error);
        //   }
        // }
    }


    constructor(
        private httpBaseUrl: string,
        private clientToken: string,
    ) {
    }

}


class GotifyWebSocket extends WebSocket {

    private wsBaseUrl: string
    private clientToken: string


    constructor(wsBaseUrl: string, clientToken: string) {

        // Init WebSocket
        super(`${wsBaseUrl}/stream`, {
            headers: {
                "X-Gotify-Key": clientToken
            }
        })
        this.wsBaseUrl = wsBaseUrl
        this.clientToken = clientToken


        this.on("open", () => {
            console.log("WebSocket opened.")
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


async function main() {
    const settings = new Settings()
    const gotifyHttp = new GotifyHttp(settings.httpBaseUrl, settings.clientToken)



    // start WebSocket client
    new GotifyWebSocket(settings.wsBaseUrl, settings.clientToken)
}


// Start
await main()





