import Customer from "./customer.js"

export default class CustomersRepository {
    // ATTRIBUTEN
    #baseUri;

    // CONSTRUCTOR
    constructor() {
        this.#baseUri = 'https://d69d8c8f-b437-4a19-8bba-4c55ce2ce8cb.mock.pstmn.io';
    }

    // METHODES
    async getAllCustomers() {
        console.log("test")
        const response = await fetch(this.#baseUri + '/customers');
        const json = await response.json();

        return json.map(customer =>
            new Customer(
                customer.id,
                customer.firstName,
                customer.lastName,
                customer.email,
                customer.phone,
                customer.address,
                customer.balance,
                customer.bins,
                customer.createdAt
            ))
    }

    async getCustomerById(id) {
        const response = await fetch(`${this.#baseUri}/customers/${id}`);
        const json = await response.json()
        
        return new Customer(
                json.id,
                json.firstName,
                json.lastName,
                json.email,
                json.phone,
                json.address,
                json.balance,
                json.bins,
                json.createdAt
            )
    }

    async updateCustomer(customer) {
        const response = await fetch(`${this.#baseUri}/customers/${customer.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customer)
            }
        );

        return await response.json();
    }

    async deleteCustomer(id) {
        await fetch(`${this.#baseUri}/customers/${id}`, {
            method: 'DELETE'
        });
    }
}