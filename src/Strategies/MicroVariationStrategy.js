class MicroVariationStrategy extends AbstractStrategy {

    config = {
        variationPeriod: 10, // minutes
        minimumTicksForAnalyze: 0,
    }

    constructor(config) {
        super(config);
    }

    async run() {

    }
}