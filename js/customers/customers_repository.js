import Customer from './customer.js';

export default class CustomersRepository {
  // ATTRIBUTEN
  #customers = [];

  // CONSTRUCTOR
  get customers() {
    return this.#customers;
  }

  // METHODES
  addCustomer(id, firstName, lastName, email, phone, address, balance, bins, createdAt) {
    this.#customers.push(new Customer(id, firstName, lastName, email, phone, address, balance, bins, createdAt));
  }

  filterCustomers(searchString) {
    return !searchString
      ? this.#customers
      : this.#customers.filter(customer =>
          `${customer.firstName} ${customer.lastName}`
            .toLowerCase()
            .includes(searchString.toLowerCase())
        );
  }
}