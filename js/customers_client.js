import Customer from "./customer.js";

export default class CustomersClient {
    // ATTRIBUTEN
    #baseUri;

    // CONSTRUCTOR
    constructor() {
        this.#baseUri = 'https://d69d8c8f-b437-4a19-8bba-4c55ce2ce8cb.mock.pstmn.io';
    }

    // METHODES
    checkStatus(response) {
        if (response.ok) {
            return response;
        } else {
            const httpErrorInfo = {
                status: response.status,
                statusText: response.statusText,
                uri: response.uri,
            };
            console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);
            throw new Error(httpErrorInfo.statusText);
        }
    }

    getCustomers() {
        const uri = `${this.#baseUri}/customers`;

        return fetch(uri)
            .then(response => this.checkStatus(response))
            .then(response => response.json())
            .then(json => json.map(customer_json => new Customer(customer_json)))
            .catch(error => {
                console.error('Error getting customers:', error);
            });
    }

    getCustomer(id) {
        throw new Error('Method not implemented yet.');
    }

    putCustomer(customerJson) {
        throw new Error('Method not implemented yet.');
    }

    deleteCustomer(id) {
        throw new Error('Method not implemented yet.');
    }
}
