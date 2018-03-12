export default class CollectionWithLimit {
    constructor(props) {
        this.limit = props.limit || 10;
        this.data = [];
    }

    checkLimit() {
        if (this.data.length === this.limit) {
            this.data.shift();
            return true;
        }
    }

    add(data) {
        this.data.push(data);
        return this.checkLimit();
    }

    splice(from, to) {
        this.data.splice(from, to);
    }

    getData() {
        return this.data.map(item => item);
    }

    at(index) {
        return this.data[index];
    }

    getLength() {
        return this.data.length;
    }

    reset() {
        this.data = [];
    }
}
//
export default class CollectionWithLimit {
    constructor(props) {
        this.limit = props.limit || 10;
        this.data = [];
    }

    checkLimit() {
        if (this.data.length === this.limit) {
            this.data.shift();
            return true;
        }
    }

    add(data) {
        this.data.push(data);
        return this.checkLimit();
    }
}