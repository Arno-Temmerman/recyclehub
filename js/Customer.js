export default class Customer {
  // ATTRIBUTEN
  #id;
  #firstName;
  #lastName;
  #email;
  #phone;
  #address;
  #balance;
  #bins;
  #createdAt;

  // CONSTRUCTOR
  constructor(id, firstName, lastName, email, phone, address, balance, bins, createdAt) {
    this.#id = id;
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#email = email;
    this.#phone = phone;
    this.#address = address;
    this.#balance = balance;
    this.#bins = bins;
    this.#createdAt = createdAt;
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

  get bins() {
    return this.#bins;
  }

  get createdAt() {
    return this.#createdAt;
  }
}
