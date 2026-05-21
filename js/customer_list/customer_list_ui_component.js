import CustomersClient from '../customers_client.js';

export default class CustomerListUiComponent {
    // ATTRIBUTEN
    #customersClient;
    #customers = [];

    // CONSTRUCTOR
    constructor() {
        this.#customersClient = new CustomersClient();
        this.#initialiseHTML();
    }

    // METHODES
    async #initialiseHTML() {
        this.#customers = await this.#customersClient.getCustomers();
        this.#setupSearchBox();
        this.#toHTML(this.#customers);
    }

    #setupSearchBox() {
        const searchBox = document.getElementById('search');
        searchBox.addEventListener('keyup', () => {
            const filtered = this.#filterCustomers(searchBox.value);
            this.#toHTML(filtered);
        });
        searchBox.focus();
    }

    #filterCustomers(searchString) {
        return !searchString
            ? this.#customers
            : this.#customers.filter(customer =>
                `${customer.firstName} ${customer.lastName}`
                    .toLowerCase()
                    .includes(searchString.toLowerCase()));
    }

    #toHTML(customers) {
        const numberElement = document.getElementById('number');
        numberElement.innerHTML = `<p>Aantal klanten: ${customers.length}</p>`;

        const customersElement = document.getElementById('customers');
        customersElement.innerHTML = '';
        customers.forEach(customer => {
            const strHTML = `
            <div class="card mb-3">
                <h6 class="card-header">${customer.firstName} ${customer.lastName}</h6>
                <div class="card-body">
                    <div class="contact-row">
                        <a href="mailto:${customer.email}">${customer.email}</a>
                        <a href="tel:${customer.phone}">${customer.phone}</a>
                    </div>
                    <p class="card-text"><b>Saldo:</b> €${customer.balance}</p>
                    <a class="btn btn-success" href="customer_details.html?id=${customer.id}">Details</a>
                </div>
            </div>`;
            customersElement.insertAdjacentHTML('beforeend', strHTML);
        });
    }
}
