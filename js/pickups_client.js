import Pickup from "./pickup.js";

export default class PickupsClient {
    // ATTRIBUTEN
    #baseUri;

    // CONSTRUCTOR
    constructor() {
        this.#baseUri = 'https://d69d8c8f-b437-4a19-8bba-4c55ce2ce8cb.mock.pstmn.io';
    }

    // METHODES
    checkStatus(response) {
        if (response.ok) {
            return response;
        } else {
            const httpErrorInfo = {
                status: response.status,
                statusText: response.statusText,
                uri: response.uri,
            };
            console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);
            throw new Error(httpErrorInfo.statusText);
        }
    }

    getPickups() {
        return fetch(`${this.#baseUri}/pickups`)
            .then(response => this.checkStatus(response))
            .then(response => response.json())
            .then(json => json.map(pickup_json => new Pickup(pickup_json)))
            .catch(error => {
                console.error('Error getting pickups:', error);
                throw error;
            });
    }
}
