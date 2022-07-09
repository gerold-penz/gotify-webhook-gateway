import {default as axios} from "axios"
import {Application, ApplicationsById, ApplicationsByName} from "./types"
import {settings} from "./settings"


export namespace Applications {

    // Returns an array with applications.
    export async function getAll(): Promise<Application[]> {
        const url = `${settings.httpBaseUrl}/application`
        const {data} = await axios.get(url, {
            headers: {"X-Gotify-Key": settings.clientToken}
        })
        return data
    }


    // Returns a map with applications. Keys are app names.
    export async function getAllByName(): Promise<ApplicationsByName> {
        const applications: ApplicationsByName = new Map()
        for (let application of await getAll()) {
            applications.set(application.name, application)
        }
        return applications
    }


    // Returns a map with applications. Keys are app ids.
    export async function getAllById(): Promise<ApplicationsById> {
        const applications: ApplicationsById = new Map()
        for (let application of await getAll()) {
            applications.set(application.id, application)
        }
        return applications
    }

}
