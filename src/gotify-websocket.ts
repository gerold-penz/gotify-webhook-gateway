import WebSocket, {RawData} from "ws"
import {settings} from "./settings.js"
import {Applications, Messages} from "./gotify-http.js"
import {ClientRequest, IncomingMessage} from "http"
import {Message, WebHook} from "./types.js"
import {default as axios, AxiosRequestConfig, AxiosError, AxiosResponse} from "axios"


export namespace GotifyWebSocket {

    let ws: WebSocket
    let appWebHooks: Map<number, WebHook[]>  // number = application.id


    export function wsConnect() {

        // Verbinden
        console.debug("Websocket connecting...")
        ws = new WebSocket(`${settings.wsBaseUrl}/stream`, {
            headers: {"X-Gotify-Key": settings.clientToken},
        })


        // WebSocket-Event: open
        ws.on("open", async () => {
            console.debug("Websocket opened.")

            // Determine WebHooks for application-IDs
            appWebHooks = new Map<number, WebHook[]>()  // number = application.id
            console.debug("Determine WebHooks for Gotify applications:")
            const applications = await Applications.getAllApplications()
            for (let application of applications) {
                for (let webHook of settings.webHooks.filter((webHook) => webHook.appName && webHook.url)) {
                    if (webHook.appName === application.name || webHook.appName === "*") {
                        const webHookList = appWebHooks.get(application.id) || []
                        webHookList.push(webHook)
                        appWebHooks.set(application.id, webHookList)
                    }
                }
            }

            // Show WebHooks for applications
            appWebHooks.forEach((webHooks, appid) => {
                const webHookInfos = webHooks.map((webHook) => {
                    return {appName: webHook.appName, url: webHook.url, deleteMessage: webHook.deleteMessage}
                })
                console.debug("WebHooks for Gotify App-ID", appid + ":", webHookInfos)
            })

        })


        // WebSocket-Event: error
        ws.on("error", (err: Error) => {
            console.error("Websocket error:", err)
        })


        // WebSocket-Event: open
        ws.on("unexpected-response", (request: ClientRequest, response: IncomingMessage) => {
            console.debug("Websocket unexpected response:", response?.statusMessage)
            if (ws?.readyState !== ws?.OPEN) {
                // Verbindung neu aufbauen
                setTimeout(wsConnect, 5000)
            }
        })


        // WebSocket-Event: close
        ws.on("close", (code: number, reason: Buffer) => {
            console.debug("Websocket closed.", code)
            if (ws?.readyState !== ws?.OPEN) {
                // Verbindung neu aufbauen
                setTimeout(wsConnect, 5000)
            }
        })


        // WebSocket-Event: message
        ws.on("message", (rawData: RawData) => {
            const message: Message = JSON.parse(rawData.toString())
            // Example message: {
            //   "id":127, "appid":5, "message":"content", "title":"title", "priority":0,
            //   "extras":{"client::display":{"contentType":"text/markdown"}},
            //   "date":"2022-07-07T20:49:42.667579539+02:00"
            // }

            console.debug("Websocket message received:", message)

            // Iterate defined WebHooks
            for (let webHook of appWebHooks.get(message.appid) || []) {

                // Copy message and enrich with additional informations
                const messageToSend: Message = {...message}
                messageToSend.appName = webHook.appName
                messageToSend.deleteMessage = webHook.deleteMessage

                // Send Webhook async
                const config: AxiosRequestConfig = {headers: {"Content-Type": "application/json"}}
                if (webHook.basicAuthUsername && webHook.basicAuthPassword) {
                    config.auth = {username: webHook.basicAuthUsername, password: webHook.basicAuthPassword}
                }
                // Request WebHook (async)
                axios.post(webHook.url, messageToSend, config)
                    // Successful request
                    .then((response: AxiosResponse) => {
                        console.debug("WebHook sent: ", response.statusText)
                    })
                    // Delete the message
                    .then(() => {
                        if (webHook.deleteMessage) {
                            return Messages.deleteMessage(messageToSend.id)
                                .then(() => {
                                    console.debug(`Gotify message #${messageToSend.id} deleted.`)
                                })
                        }
                    })
                    // Error handler
                    .catch((err: AxiosError) => {
                        console.error("WebHook error:", err.message, err.code, err.config.url)
                    })

            }

        })
    }

}
