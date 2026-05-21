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
        const uri = `${this.#baseUri}/customers/${id}`;

        return fetch(uri)
            .then(response => this.checkStatus(response))
            .then(response => response.json())
            .then(json => new Customer(json))
            .catch(error => {
                console.error('Error getting customer:', error);
            });
    }

    putCustomer(customerJson) {
        const uri = `${this.#baseUri}/customers/${customerJson.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(customerJson)
        };

        return fetch(uri, requestOptions)
            .then(response => this.checkStatus(response))
            .then(response => response.json())
            .catch(error => {
                console.error('Error putting customer:', error);
            });
    }

    deleteCustomer(id) {
        const uri = `${this.#baseUri}/customers/${id}`;

        const requestOptions = {
            method: 'DELETE'
        };

        return fetch(uri, requestOptions)
            .then(response => this.checkStatus(response))
            .catch(error => {
                console.error('Error deleting customer:', error);
            });
    }
}
