import WebSocket, {RawData} from "ws"
import {settings} from "./settings"
import {Applications} from "./gotify-http"
import {ClientRequest, IncomingMessage} from "http"


export class GotifyWebSocket {

    private ws!: WebSocket

    constructor() {
        this.wsConnect()
    }


    wsConnect() {
        // Verbinden
        console.log("Websocket connecting...")
        this.ws = new WebSocket(`${settings.wsBaseUrl}/stream`, {
            headers: {"X-Gotify-Key": settings.clientToken},
        })

        // WebSocket-Events
        this.ws.on("open", this.onOpen)
        this.ws.on("error", this.onError)
        this.ws.on("unexpected-response", this.onUnexpectedResponse)
        this.ws.on("close", this.onClose)
        this.ws.on("message", this.onMessage)
    }


    private async onOpen() {
        console.debug("Websocket opened.")
        const applicationsByName = await Applications.getAllByName()

        // // get webhooks for applications
        // async function getAppWebHooks() {
        //     const gotifyHttp = new GotifyHttp(settings.httpBaseUrl, settings.clientToken)
        //     const applicationsByName = await gotifyHttp.getApplicationsByName()
        //     const appWebHooks = new Map<number, WebHook>()
        //
        //     for (const webHook of settings.webHooks) {
        //         if (webHook.appName === "*") {
        //             appWebHooks.set(0, webHook)
        //         } else {
        //             if (!applicationsByName.has(webHook.appName)) {
        //                 throw new Error(`App name '${webHook.appName}' not found.`)
        //             }
        //             const application = applicationsByName.get(webHook.appName) as Application
        //             appWebHooks.set(application.id, webHook)
        //         }
        //     }
        //     return appWebHooks
        // }

    }


    private onError(err: Error) {
        console.error("Websocket error:", err)
    }


    private onUnexpectedResponse(request: ClientRequest, response: IncomingMessage) {
        console.debug("Websocket unexpected response:", response?.statusMessage)
        if (this.ws.readyState !== this.ws.OPEN) {
            // Verbindung neu aufbauen
            setTimeout(this.wsConnect, 5000)
        }
    }


    private onClose(code: number, reason: Buffer) {
        console.debug("Websocket closed.", code)
        if (this.ws.readyState !== this.ws.OPEN) {
            // Verbindung neu aufbauen
            setTimeout(this.wsConnect, 5000)
        }
    }


    private async onMessage(data: RawData, isBinary: boolean) {
        console.debug("Websocket message received:", data.toString(), typeof data)
        // {
        //   "id":127,
        //   "appid":5,
        //   "message":"content",
        //   "title":"title",
        //   "priority":0,
        //   "extras":{"client::display":{"contentType":"text/markdown"}},
        //   "date":"2022-07-07T20:49:42.667579539+02:00"
        // }
        //
        // // Check if app has a configured webhook
        // if (!appWebHooks.has(message.appid)) {
        //     return
        // }
        //
        // // Send Webhook async
        // const webHook = appWebHooks.get(message.appid)!
        // const config: AxiosRequestConfig = {headers: {"Content-Type": "application/json"}}
        // if (webHook.basicAuthUsername && webHook.basicAuthPassword) {
        //     config.auth = {username: webHook.basicAuthUsername, password: webHook.basicAuthPassword}
        // }
        //
        // // Request WebHook
        // try {
        //     await axios.post(webHook.url, message, config)
        // } catch (error) {
        //     console.error(error)
        // }

    }

}



