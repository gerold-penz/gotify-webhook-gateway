import {default as axios} from "axios"
import {Application} from "./types.js"
import {settings} from "./settings.js"


export namespace Applications {

    // Returns an array with applications.
    export async function getAllApplications(): Promise<Application[]> {
        const url = `${settings.httpBaseUrl}/application`
        const {data} = await axios.get(url, {headers: {"X-Gotify-Key": settings.clientToken}})
        return data
    }


    // // Returns a map with applications. Keys are app names.
    // export async function getAllByName(): Promise<ApplicationsByName> {
    //     const applications: ApplicationsByName = new Map()
    //     for (let application of await getAll()) {
    //         applications.set(application.name, application)
    //     }
    //     return applications
    // }
    //
    //
    // // Returns a map with applications. Keys are app ids.
    // export async function getAllById(): Promise<ApplicationsById> {
    //     const applications: ApplicationsById = new Map()
    //     for (let application of await getAll()) {
    //         applications.set(application.id, application)
    //     }
    //     return applications
    // }

}


export namespace Messages {

    // Deletes a message
    export async function deleteMessage(messageId: number): Promise<void> {
        if (!messageId) {
            return
        }
        const url = `${settings.httpBaseUrl}/message/${messageId}`
        await axios.delete(url, {headers: {"X-Gotify-Key": settings.clientToken}})
    }

}

