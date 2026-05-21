import Pickup from "./pickup.js";

export default class PickupsClient {
    // ATTRIBUTEN
    #baseUri;

    // CONSTRUCTOR
    constructor() {
        this.#baseUri = 'https://d69d8c8f-b437-4a19-8bba-4c55ce2ce8cb.mock.pstmn.io';
    }

    // METHODES
    getPickups() {
        return fetch(`${this.#baseUri}/pickups`)
            .then(response => response.json())
            .then(json => json.map(pickup_json => new Pickup(pickup_json)))
            .catch(error => {
                console.error('Error getting pickups:', error);
                throw error;
            });
    }
}
