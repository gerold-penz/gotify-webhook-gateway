import {default as axios} from "axios"
import {Application, ApplicationsById, ApplicationsByName} from "./types.js"


export class GotifyHttp {


    constructor(
        private httpBaseUrl: string,
        private clientToken: string,
    ) {
    }


    // Returns an array with applications.
    async getApplications(): Promise<Application[]> {
        const url = `${this.httpBaseUrl}/application`
        const {data} = await axios.get(url, {
            headers: {
                "X-Gotify-Key": this.clientToken
            }
        })
        return data
    }


    // Returns a map with applications. Keys are app names.
    async getApplicationsByName(): Promise<ApplicationsByName> {
        const applications: ApplicationsByName = new Map()
        for (let application of await this.getApplications()) {
            applications.set(application.name, application)
        }
        return applications
    }


    // Returns a map with applications. Keys are app ids.
    async getApplicationsById(): Promise<ApplicationsById> {
        const applications: ApplicationsById = new Map()
        for (let application of await this.getApplications()) {
            applications.set(application.id, application)
        }
        return applications
    }


}
