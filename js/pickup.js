export default class Pickup {
    // ATTRIBUTEN
    #id;
    #date
    #type;

    // CONSTRUCTOR
    constructor(data) {
        this.#id = data.id;
        this.#date = data.date;
        this.#type = data.type;
    }

    // METHODES
    get id() {
        return this.#id;
    }

    get date() {
        return this.#date;
    }

    get type() {
        return this.#type;
    }
}
