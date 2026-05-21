import Customer from "./customer.js"

export default class CustomersClient {
    // ATTRIBUTEN
    #baseUri;

    // CONSTRUCTOR
    constructor() {
        this.#baseUri = 'https://d69d8c8f-b437-4a19-8bba-4c55ce2ce8cb.mock.pstmn.io';
    }

    // METHODES
    async checkStatus(response) {
        if (response.ok) {
            return response;
        } 
        else {
            
            const httpErrorInfo = {
                status: response.status,
                statusText: response.statusText,
                url: response.url,
            };
            console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);
            throw new Error(httpErrorInfo.statusText);
        }
    }

    async getCustomers() {
        let response = await fetch(`${this.#baseUri}/customers`);
        response = await this.checkStatus(response);
        const json = await response.json();

        return json.map(customer_json => new Customer(customer_json))
    }

    async getCustomer(id) {
        let response = await fetch(`${this.#baseUri}/customers/${id}`);
        response = await this.checkStatus(response);
        const json = await response.json()
        
        return new Customer(json)
    }

    async putCustomer(customer) {
        let response = await fetch(
            `${this.#baseUri}/customers/${customer.id}`,
            {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(customer)
            }
        );
        response = await this.checkStatus(response);

        return await response.json();
    }

    async deleteCustomer(id) {
        let response = await fetch(
            `${this.#baseUri}/customers/${id}`, 
            {
                method: 'DELETE'
            })
        return await this.checkStatus(response);
    }
}
