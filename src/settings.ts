import "dotenv/config"
import {env} from "process"
import {WebHook} from "./types.js"


class Settings {

    httpBaseUrl: string
    wsBaseUrl: string
    webHooks: WebHook[] = []


    constructor(
        private readonly gotifyHostname = (env["GOTIFY_HOSTNAME"] as string).toLowerCase(),
        private gotifyHttps = (env["GOTIFY_HTTPS"] as string).toLowerCase(),
        public readonly clientToken = env["GOTIFY_CLIENT_TOKEN"] as string,
        private readonly app1Name = env["APP_1_NAME"] as string,
        private readonly app1Webhook = env["APP_1_WEBHOOK"] as string,
        private readonly app1BasicAuthUsername = env["APP_1_BASIC_AUTH_USERNAME"] as string,
        private readonly app1BasicAuthPassword = env["APP_1_BASIC_AUTH_PASSWORD"] as string,
        private readonly app2Name = env["APP_2_NAME"] as string,
        private readonly app2Webhook = env["APP_2_WEBHOOK"] as string,
        private readonly app2BasicAuthUsername = env["APP_2_BASIC_AUTH_USERNAME"] as string,
        private readonly app2BasicAuthPassword = env["APP_2_BASIC_AUTH_PASSWORD"] as string,
        private readonly app3Name = env["APP_3_NAME"] as string,
        private readonly app3Webhook = env["APP_3_WEBHOOK"] as string,
        private readonly app3BasicAuthUsername = env["APP_3_BASIC_AUTH_USERNAME"] as string,
        private readonly app3BasicAuthPassword = env["APP_3_BASIC_AUTH_PASSWORD"] as string,
        private readonly app4Name = env["APP_4_NAME"] as string,
        private readonly app4Webhook = env["APP_4_WEBHOOK"] as string,
        private readonly app4BasicAuthUsername = env["APP_4_BASIC_AUTH_USERNAME"] as string,
        private readonly app4BasicAuthPassword = env["APP_4_BASIC_AUTH_PASSWORD"] as string,
        private readonly app5Name = env["APP_5_NAME"] as string,
        private readonly app5Webhook = env["APP_5_WEBHOOK"] as string,
        private readonly app5BasicAuthUsername = env["APP_5_BASIC_AUTH_USERNAME"] as string,
        private readonly app5BasicAuthPassword = env["APP_5_BASIC_AUTH_PASSWORD"] as string,
        private readonly app6Name = env["APP_6_NAME"] as string,
        private readonly app6Webhook = env["APP_6_WEBHOOK"] as string,
        private readonly app6BasicAuthUsername = env["APP_6_BASIC_AUTH_USERNAME"] as string,
        private readonly app6BasicAuthPassword = env["APP_6_BASIC_AUTH_PASSWORD"] as string,
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
        this.wsBaseUrl = `${https ? "wss" : "ws"}://${this.gotifyHostname}`

        // Webhooks ermitteln
        for (const [appName, url, basicAuthUsername, basicAuthPassword] of [
            [this.app1Name, this.app1Webhook, this.app1BasicAuthUsername, this.app1BasicAuthPassword],
            [this.app2Name, this.app2Webhook, this.app2BasicAuthUsername, this.app2BasicAuthPassword],
            [this.app3Name, this.app3Webhook, this.app3BasicAuthUsername, this.app3BasicAuthPassword],
            [this.app4Name, this.app4Webhook, this.app4BasicAuthUsername, this.app4BasicAuthPassword],
            [this.app5Name, this.app5Webhook, this.app5BasicAuthUsername, this.app5BasicAuthPassword],
            [this.app6Name, this.app6Webhook, this.app6BasicAuthUsername, this.app6BasicAuthPassword],
        ]) {
            if (appName && url) {
                this.webHooks.push({appName, url, basicAuthUsername, basicAuthPassword})
            }
        }


    }

}


export const settings = new Settings()

