import PickupsClient from '../pickup_client.js';

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
        const pickupsElement = document.getElementById('pickups');
        pickupsElement.innerHTML = '';
        
        pickups.forEach(pickup => {
            const strHTML = `
            <div class="card mb-3">
                <h6 class="card-header">${pickup.date}</h6>
                <div class="card-body">
                    <p class="card-text">${pickup.type}</p>
                </div>
            </div>`;
            pickupsElement.insertAdjacentHTML('beforeend', strHTML);
        });
    }
}