import {env} from "process"
import "dotenv/config"
import {WebHook} from "./types.js"


class Settings {

    httpBaseUrl: string
    wsBaseUrl: string


    constructor(
        private readonly gotifyHostname = (env["GOTIFY_HOSTNAME"] as string).toLowerCase(),
        private gotifyHttps = (env["GOTIFY_HTTPS"] as string).toLowerCase(),
        public clientToken = env["GOTIFY_CLIENT_TOKEN"] as string,
        public app1Name = env["APP_1_NAME"] as string,
        public app1Webhook = env["APP_1_WEBHOOK"] as string,
        public app1BasicAuthUsername= env["APP_1_BASIC_AUTH_USERNAME"] as string,
        public app1BasicAuthPassword= env["APP_1_BASIC_AUTH_PASSWORD"] as string,
        public app2Name = env["APP_2_NAME"] as string,
        public app2Webhook = env["APP_2_WEBHOOK"] as string,
        public app2BasicAuthUsername= env["APP_2_BASIC_AUTH_USERNAME"] as string,
        public app2BasicAuthPassword= env["APP_2_BASIC_AUTH_PASSWORD"] as string,
        public app3Name = env["APP_3_NAME"] as string,
        public app3Webhook = env["APP_3_WEBHOOK"] as string,
        public app3BasicAuthUsername= env["APP_3_BASIC_AUTH_USERNAME"] as string,
        public app3BasicAuthPassword= env["APP_3_BASIC_AUTH_PASSWORD"] as string,
        public app4Name = env["APP_4_NAME"] as string,
        public app4Webhook = env["APP_4_WEBHOOK"] as string,
        public app4BasicAuthUsername= env["APP_4_BASIC_AUTH_USERNAME"] as string,
        public app4BasicAuthPassword= env["APP_4_BASIC_AUTH_PASSWORD"] as string,
        public app5Name = env["APP_5_NAME"] as string,
        public app5Webhook = env["APP_5_WEBHOOK"] as string,
        public app5BasicAuthUsername= env["APP_5_BASIC_AUTH_USERNAME"] as string,
        public app5BasicAuthPassword= env["APP_5_BASIC_AUTH_PASSWORD"] as string,
        public app6Name = env["APP_6_NAME"] as string,
        public app6Webhook = env["APP_6_WEBHOOK"] as string,
        public app6BasicAuthUsername= env["APP_6_BASIC_AUTH_USERNAME"] as string,
        public app6BasicAuthPassword= env["APP_6_BASIC_AUTH_PASSWORD"] as string,
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

    }


    getWebHooks() {
        const webHooks: WebHook[] = []
        for (const [appName, url, basicAuthUsername, basicAuthPassword] of [
            [this.app1Name, this.app1Webhook, this.app1BasicAuthUsername, this.app1BasicAuthPassword],
            [this.app2Name, this.app2Webhook, this.app2BasicAuthUsername, this.app2BasicAuthPassword],
            [this.app3Name, this.app3Webhook, this.app3BasicAuthUsername, this.app3BasicAuthPassword],
            [this.app4Name, this.app4Webhook, this.app4BasicAuthUsername, this.app4BasicAuthPassword],
            [this.app5Name, this.app5Webhook, this.app5BasicAuthUsername, this.app5BasicAuthPassword],
            [this.app6Name, this.app6Webhook, this.app6BasicAuthUsername, this.app6BasicAuthPassword],
        ]) {
            if (appName && url) {
                webHooks.push({appName, url, basicAuthUsername, basicAuthPassword})
            }
        }
        return webHooks
    }

}

export const settings = new Settings()

