class AbstractStrategy {

    config = {};

    constructor(config) {
        if (this.constructor === AbstractStrategy) {
            throw new TypeError('Abstract class "AbstractStrategy" cannot be instantiated directly');
        }

        this.config = {...this.config, ...config};
    }

    async run() {
        throw new TypeError('run() must be implemented');
    }
}