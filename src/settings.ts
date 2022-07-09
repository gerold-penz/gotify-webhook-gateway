import "dotenv/config"
import {env} from "process"
import {WebHook} from "./types.js"


function strToBool(text: string): boolean {
    if (!text) {
        return false
    }
    text = text.toLowerCase()
    return (
        text === "true" ||
        text === "1" ||
        text === "yes" ||
        text === "on"
    )
}


class Settings {

    httpBaseUrl: string
    wsBaseUrl: string
    webHooks: WebHook[] = []


    constructor(
        private readonly gotifyHostname = (env["GOTIFY_HOSTNAME"] as string).toLowerCase(),
        private gotifyHttps = (env["GOTIFY_HTTPS"] as string).toLowerCase(),
        public readonly clientToken = env["GOTIFY_CLIENT_TOKEN"] as string,
        private readonly app1Name = env["APP_1_NAME"] as string,
        private readonly app1WebhookUrl = env["APP_1_WEBHOOK_URL"] as string,
        private readonly app1BasicAuthUsername = env["APP_1_BASIC_AUTH_USERNAME"] as string,
        private readonly app1BasicAuthPassword = env["APP_1_BASIC_AUTH_PASSWORD"] as string,
        private readonly app1DeleteMessage = env["APP_1_DELETE_MESSAGE"] as string,
        private readonly app2Name = env["APP_2_NAME"] as string,
        private readonly app2WebhookUrl = env["APP_2_WEBHOOK_URL"] as string,
        private readonly app2BasicAuthUsername = env["APP_2_BASIC_AUTH_USERNAME"] as string,
        private readonly app2BasicAuthPassword = env["APP_2_BASIC_AUTH_PASSWORD"] as string,
        private readonly app2DeleteMessage = env["APP_2_DELETE_MESSAGE"] as string,
        private readonly app3Name = env["APP_3_NAME"] as string,
        private readonly app3WebhookUrl = env["APP_3_WEBHOOK_URL"] as string,
        private readonly app3BasicAuthUsername = env["APP_3_BASIC_AUTH_USERNAME"] as string,
        private readonly app3BasicAuthPassword = env["APP_3_BASIC_AUTH_PASSWORD"] as string,
        private readonly app3DeleteMessage = env["APP_3_DELETE_MESSAGE"] as string,
        private readonly app4Name = env["APP_4_NAME"] as string,
        private readonly app4WebhookUrl = env["APP_4_WEBHOOK_URL"] as string,
        private readonly app4BasicAuthUsername = env["APP_4_BASIC_AUTH_USERNAME"] as string,
        private readonly app4BasicAuthPassword = env["APP_4_BASIC_AUTH_PASSWORD"] as string,
        private readonly app4DeleteMessage = env["APP_4_DELETE_MESSAGE"] as string,
        private readonly app5Name = env["APP_5_NAME"] as string,
        private readonly app5WebhookUrl = env["APP_5_WEBHOOK_URL"] as string,
        private readonly app5BasicAuthUsername = env["APP_5_BASIC_AUTH_USERNAME"] as string,
        private readonly app5BasicAuthPassword = env["APP_5_BASIC_AUTH_PASSWORD"] as string,
        private readonly app5DeleteMessage = env["APP_5_DELETE_MESSAGE"] as string,
        private readonly app6Name = env["APP_6_NAME"] as string,
        private readonly app6WebhookUrl = env["APP_6_WEBHOOK_URL"] as string,
        private readonly app6BasicAuthUsername = env["APP_6_BASIC_AUTH_USERNAME"] as string,
        private readonly app6BasicAuthPassword = env["APP_6_BASIC_AUTH_PASSWORD"] as string,
        private readonly app6DeleteMessage = env["APP_6_DELETE_MESSAGE"] as string,
    ) {
        // remove slash
        if (this.gotifyHostname.endsWith("/")) {
            this.gotifyHostname = gotifyHostname.slice(0, -1)
        }
        // use secure URL?
        const https = strToBool(this.gotifyHttps)

        // URL for HTTP requests
        this.httpBaseUrl = `${https ? "https" : "http"}://${this.gotifyHostname}`
        this.wsBaseUrl = `${https ? "wss" : "ws"}://${this.gotifyHostname}`

        // Webhooks ermitteln
        for (const [appName, url, basicAuthUsername, basicAuthPassword, deleteMessage] of [
            [this.app1Name, this.app1WebhookUrl, this.app1BasicAuthUsername, this.app1BasicAuthPassword, strToBool(this.app1DeleteMessage)],
            [this.app2Name, this.app2WebhookUrl, this.app2BasicAuthUsername, this.app2BasicAuthPassword, strToBool(this.app2DeleteMessage)],
            [this.app3Name, this.app3WebhookUrl, this.app3BasicAuthUsername, this.app3BasicAuthPassword, strToBool(this.app3DeleteMessage)],
            [this.app4Name, this.app4WebhookUrl, this.app4BasicAuthUsername, this.app4BasicAuthPassword, strToBool(this.app4DeleteMessage)],
            [this.app5Name, this.app5WebhookUrl, this.app5BasicAuthUsername, this.app5BasicAuthPassword, strToBool(this.app5DeleteMessage)],
            [this.app6Name, this.app6WebhookUrl, this.app6BasicAuthUsername, this.app6BasicAuthPassword, strToBool(this.app6DeleteMessage)],
        ]) {
            if (appName && url) {
                this.webHooks.push({
                    appName: appName as string,
                    url: url as string,
                    basicAuthUsername: basicAuthUsername as string,
                    basicAuthPassword: basicAuthPassword as string,
                    deleteMessage: deleteMessage as boolean
                })
            }
        }


    }

}


export const settings = new Settings()

