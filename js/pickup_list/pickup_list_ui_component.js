import PickupsClient from '../pickups_client.js';

export default class PickupListUiComponent {
    // ATTRIBUTEN
    #pickupsClient;
    #pickups = [];

    // CONSTRUCTOR
    constructor() {
        this.#pickupsClient = new PickupsClient();
        this.#initialiseHTML();
    }

    // METHODES
    async #initialiseHTML() {
        this.#pickups = await this.#pickupsClient.getPickups();
        this.#toHTML(this.#pickups);
    }

    #toHTML(pickups) {
        throw new Error('Method not implemented yet.');
    }
}
