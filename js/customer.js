export default class Customer {
    // ATTRIBUTEN
    #id;
    #firstName;
    #lastName;
    #email;
    #phone;
    #address;
    #balance;
    #pickups;

    // CONSTRUCTOR
    constructor(data) {
        this.#id = data.id;
        this.#firstName = data.firstName;
        this.#lastName = data.lastName;
        this.#balance = data.balance;

        // optional fields (only in detail view)
        this.#email = data.email;
        this.#phone = data.phone;
        this.#address = data.address;
        this.#pickups = data.pickups;
    }

    // METHODES
    get id() {
        return this.#id;
    }

    get firstName() {
        return this.#firstName;
    }

    get lastName() {
        return this.#lastName;
    }

    get email() {
        return this.#email;
    }

    get phone() {
        return this.#phone;
    }

    get address() {
        return this.#address;
    }

    get balance() {
        return this.#balance;
    }

    get pickups() {
        return this.#pickups;
    }
}
