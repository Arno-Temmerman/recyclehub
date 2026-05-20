import CustomersRepository from './customers_repository.js';

export default class CustomerDetailComponent {
    // ATTRIBUTEN
    #customersRepository;
    #uri;

    // CONSTRUCTOR
    constructor() {
        this.#uri = 'https://d69d8c8f-b437-4a19-8bba-4c55ce2ce8cb.mock.pstmn.io/customers';
        this.#customersRepository = new CustomersRepository();
        this.#initialiseHTML();
    }

    // METHODES
    async #initialiseHTML() {
        await this.#getData(); // vul de customersRepository op
        this.#setupSearchBox(); // stel de event handler van search box in
        this.#customersToHTML(this.#customersRepository.customers); // toon initieel alle klanten
    }

    async #getData() {
        try {
            const response = await fetch(this.#uri);
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            const json = await response.json();
            json.forEach(customer => {
                this.#customersRepository.addCustomer(
                    customer.id,
                    customer.firstName,
                    customer.lastName,
                    customer.email,
                    customer.phone,
                    customer.address,
                    customer.balance,
                    customer.bins,
                    customer.createdAt
                );
            });
        } catch (error) {
            alert('There has been a problem with your fetch operation: ' + error.message);
        }
    }

    #setupSearchBox() {
        const searchBox = document.getElementById('search');
        searchBox.addEventListener('keyup', () => {
            const filteredCustomers = this.#customersRepository.filterCustomers(
                searchBox.value
            );
            this.#customersToHTML(filteredCustomers);
        });
        searchBox.focus();
    }

    // Beeld een doorgegeven customers-array af op de webpagina
    #customersToHTML(customers) {
        const numberElement = document.getElementById('number');
        const customersElement = document.getElementById('customers');

        customersElement.innerHTML = '';

        numberElement.innerHTML = `<p>Aantal klanten: ${customers.length}</p>`;

        customers.forEach(customer => {
            const strHTML = `
            <div class="card mb-3">
                <h6 class="card-header">${customer.firstName} ${customer.lastName}</h6>
                <div class="card-body">
                    <div class="contact-row">
                        <a href="mailto:${customer.email}">${customer.email}</a>
                        <a href="callto:${customer.phone}">${customer.phone}</a>
                    </div>
                    <p class="card-text"><b>Saldo:</b> €${customer.balance}</p>
                    <a class="btn btn-success" href="customer_detail.html?id=${customer.id}">Detail</a>
                </div>
            </div>`;

            customersElement.insertAdjacentHTML('beforeend', strHTML);
        });
    }
}