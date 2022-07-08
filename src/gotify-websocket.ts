// import {Message} from "./types"
//
//
// export class GotifyWebSocket extends WebSocket {
//
//     constructor(private wsBaseUrl: string, private clientToken: string) {
//
//         // Init WebSocket
//         super(`${wsBaseUrl}/stream`, {
//             headers: {
//                 "X-Gotify-Key": clientToken
//             }
//         })
//
//         // onOpen
//         this.on("open", () => {
//             console.debug("WebSocket opened.")
//         })
//
//         // onClose
//         this.on("close", () => {
//             console.debug("WebSocket closed.")
//         })
//
//         // onError
//         this.on("error", (error) => {
//             console.error("WebSocket error: %s", error)
//         })
//
//
//         // onMessage
//         this.on("message", async (data: string) => {
//
//             const message: Message = JSON.parse(data)
//             // {
//             //   "id":127,
//             //   "appid":5,
//             //   "message":"content",
//             //   "title":"title",
//             //   "priority":0,
//             //   "extras":{"client::display":{"contentType":"text/markdown"}},
//             //   "date":"2022-07-07T20:49:42.667579539+02:00"
//             // }
//
//             console.debug("Message received: %s", message.message)
//
//             // Check if app has a configured webhook
//             if (!appWebHooks.has(message.appid)) {
//                 return
//             }
//
//             // Send Webhook async
//             const webHook = appWebHooks.get(message.appid)!
//             const config: AxiosRequestConfig = {headers: {"Content-Type": "application/json"}}
//             if (webHook.basicAuthUsername && webHook.basicAuthPassword) {
//                 config.auth = {username: webHook.basicAuthUsername, password: webHook.basicAuthPassword}
//             }
//
//             // Request WebHook
//             try {
//                 await axios.post(webHook.url, message, config)
//             } catch (error) {
//                 console.error(error)
//             }
//         })
//
//     }
//
// }
