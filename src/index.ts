import {settings} from "./settings.js"
import {GotifyHttp} from "./gotify-http.js"
import {GotifyWebSocket} from "./gotify-websocket.js"
import {Application, Message, WebHook} from "./types.js"
import {default as axios, AxiosRequestConfig} from "axios"


// get webhooks for applications
async function getAppWebHooks() {
    const gotifyHttp = new GotifyHttp(settings.httpBaseUrl, settings.clientToken)
    const applicationsByName = await gotifyHttp.getApplicationsByName()
    const webHooks = settings.getWebHooks()
    const appWebHooks = new Map<number, WebHook>()

    for (const webHook of webHooks) {
        if (!applicationsByName.has(webHook.appName)) {
            throw new Error(`App name '${webHook.appName}' not found.`)
        }
        const application = applicationsByName.get(webHook.appName) as Application
        appWebHooks.set(application.id, webHook)
    }
    return appWebHooks
}


async function main() {
    // start WebSocket client
    const appWebHooks = await getAppWebHooks()
    const webSocket = new GotifyWebSocket(settings.wsBaseUrl, settings.clientToken)


    // onMessage
    webSocket.on("message", async (data: string) => {

        const message: Message = JSON.parse(data)
        // {
        //   "id":127,
        //   "appid":5,
        //   "message":"content",
        //   "title":"title",
        //   "priority":0,
        //   "extras":{"client::display":{"contentType":"text/markdown"}},
        //   "date":"2022-07-07T20:49:42.667579539+02:00"
        // }

        console.debug("Message received: %s", message.message)

        // Check if app has a configured webhook
        if (!appWebHooks.has(message.appid)) {
            return
        }

        // Send Webhook async
        const webHook = appWebHooks.get(message.appid)!
        const config: AxiosRequestConfig = {headers: {"Content-Type": "application/json"}}
        if (webHook.basicAuthUsername && webHook.basicAuthPassword) {
            config.auth = {username: webHook.basicAuthUsername, password: webHook.basicAuthPassword}
        }

        // Request WebHook
        try {
            await axios.post(webHook.url, message, config)
        } catch (error) {
            console.error(error)
        }
    })

}


await main()
