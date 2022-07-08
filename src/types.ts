export type Application = {
    id: number
    token: string
    name: string
    internal: boolean
    description?: string
    image?: string
}
export type ApplicationsById = Map<number, Application>
export type ApplicationsByName = Map<string, Application>
export type Message = {
    id: number
    appid: number
    message: string
    title: string
    priority: number
    date: string
    extras?: any
}
export type WebHook = {
    appName: string
    url: string
    basicAuthUsername?: string
    basicAuthPassword?: string
    deleteMessage?: boolean
}
