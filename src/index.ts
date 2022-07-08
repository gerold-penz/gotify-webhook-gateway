import {settings} from "./settings.js"
import {GotifyHttp} from "./gotify-http.js"
import {Application, WebHook} from "./types.js"
import {WebsocketBuilder, Websocket} from 'websocket-ts'


// get webhooks for applications
async function getAppWebHooks() {
    const gotifyHttp = new GotifyHttp(settings.httpBaseUrl, settings.clientToken)
    const applicationsByName = await gotifyHttp.getApplicationsByName()
    const appWebHooks = new Map<number, WebHook>()

    for (const webHook of settings.webHooks) {
        if (!applicationsByName.has(webHook.appName)) {
            throw new Error(`App name '${webHook.appName}' not found.`)
        }
        const application = applicationsByName.get(webHook.appName) as Application
        appWebHooks.set(application.id, webHook)
    }
    return appWebHooks
}


async function onOpen(instance: Websocket, event: Event) {
    console.debug("Websocket onOpen:", event)
}


async function onClose(instance: Websocket, event: Event) {
    console.debug("Websocket onClose:", event)
}


async function onError(instance: Websocket, event: Event) {
    console.debug("Websocket onError:", event)
}


async function onMessage(instance: Websocket, event: Event) {
    console.debug("Websocket onMessage:", event)
}


async function onRetry(instance: Websocket, event: Event) {
    console.debug("Websocket onRetry:", event)
}


async function main() {
    const appWebHooks = await getAppWebHooks()

    const ws = new WebsocketBuilder(`${settings.wsBaseUrl}/stream`)
        // @ts-ignore
        .onOpen(onOpen)
        // @ts-ignore
        .onClose(onClose)
        // @ts-ignore
        .onError(onError)
        // @ts-ignore
        .onMessage(onMessage)
        // @ts-ignore
        .onRetry(onRetry)
        .build()

}


await main()
