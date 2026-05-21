import CustomersClient from '../customers_client.js';

export default class CustomerDetailsUiComponent {
    // ATTRIBUTEN
    #customersClient;
    #currentCustomer;

    // CONSTRUCTOR
    constructor() {
        this.#customersClient = new CustomersClient();
        this.#initialiseHTML();
    }

    // METHODES
    async #initialiseHTML() {
        this.#currentCustomer = await this.#getCustomerFromUrl()
        this.#fillForm();
        this.#setupSaveButton();
        this.#setupDeleteButton();
    }

    async #getCustomerFromUrl() {
        const customerId = new URLSearchParams(window.location.search).get('id');
        return this.#customersClient.getCustomer(customerId);
    }

    #fillForm() {
        document.getElementById('id').value = this.#currentCustomer.id;
        document.getElementById('firstName').value = this.#currentCustomer.firstName;
        document.getElementById('lastName').value = this.#currentCustomer.lastName;
        document.getElementById('email').value = this.#currentCustomer.email;
        document.getElementById('phone').value = this.#currentCustomer.phone;
        document.getElementById('street').value = this.#currentCustomer.address.street;
        document.getElementById('postalCode').value = this.#currentCustomer.address.postalCode;
        document.getElementById('city').value = this.#currentCustomer.address.city;
        document.getElementById('balance').value = this.#currentCustomer.balance;
    }

    #toCustomerJson(formData) {
        throw new Error('Method not implemented yet.');
    }

    #setupSaveButton() {
        const form = document.getElementById('customer-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = Object.fromEntries(new FormData(form).entries())
            const customerJson = this.#toCustomerJson(formData);
            await this.#customersClient.putCustomer(customerJson);

            alert(`Klant succesvol bijgewerkt.\n\n(Merk op dat de klant niet gewijzigd zal zijn in het overzicht, aangezien we werken met een mock API.)`);
            window.location.href = 'customer_list.html';
        });
    }

    #setupDeleteButton() {
        const deleteButton = document.getElementById('deleteBtn');

        deleteButton.addEventListener('click', async () => {
            await this.#customersClient.deleteCustomer(this.#currentCustomer.id);

            alert('Klant verwijderd.\n\n(Merk op dat de klant nog aanwezig zal zijn in het overzicht, aangezien we werken met een mock API.)');
            window.location.href = 'customer_list.html';
        });
    }
}
