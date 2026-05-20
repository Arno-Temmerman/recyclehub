import Pickup from "./pickup.js"

export default class PickupsClient {
    // ATTRIBUTEN
    #baseUri;

    // CONSTRUCTOR
    constructor() {
        this.#baseUri = 'https://d69d8c8f-b437-4a19-8bba-4c55ce2ce8cb.mock.pstmn.io';
    }

    // METHODES
    async getPickups() {
        const response = await fetch(this.#baseUri + '/pickups');
        const json = await response.json();
        console.log(json)

        return json.map(pickup_json => new Pickup(pickup_json))
    }
}
