import {default as axios} from "axios"
import {Application, ApplicationsById, ApplicationsByName} from "./types.js"
import {settings} from "./settings.js"


// Returns an array with applications.
export async function getApplications(): Promise<Application[]> {
    const url = `${settings.httpBaseUrl}/application`
    const {data} = await axios.get(url, {
        headers: {"X-Gotify-Key": settings.clientToken}
    })
    return data
}


// Returns a map with applications. Keys are app names.
export async function getApplicationsByName(): Promise<ApplicationsByName> {
    const applications: ApplicationsByName = new Map()
    for (let application of await getApplications()) {
        applications.set(application.name, application)
    }
    return applications
}


// Returns a map with applications. Keys are app ids.
export async function getApplicationsById(): Promise<ApplicationsById> {
    const applications: ApplicationsById = new Map()
    for (let application of await getApplications()) {
        applications.set(application.id, application)
    }
    return applications
}

