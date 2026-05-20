import Customer from "./customer.js"

export default class CustomersClient {
    // ATTRIBUTEN
    #baseUri;

    // CONSTRUCTOR
    constructor() {
        this.#baseUri = 'https://d69d8c8f-b437-4a19-8bba-4c55ce2ce8cb.mock.pstmn.io';
    }

    // METHODES
    async getCustomers() {
        const response = await fetch(this.#baseUri + '/customers');
        const json = await response.json();

        return json.map(customer_json => new Customer(customer_json))
    }

    async getCustomer(id) {
        const response = await fetch(`${this.#baseUri}/customers/${id}`);
        const json = await response.json()
        
        return new Customer(json)
    }

    async updateCustomer(customer) {
        const response = await fetch(`${this.#baseUri}/customers/${customer.id}`,
            {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(customer)
            }
        );

        return await response.json();
    }

    async deleteCustomer(id) {
        await fetch(`${this.#baseUri}/customers/${id}`, 
            {
            method: 'DELETE'
        });
    }
}
