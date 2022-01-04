/**
 * La MACD, pour Moving Average Convergence Divergence, est un indicateur boursier très populaire,
 * notamment auprès des traders à court terme.
 * C’est indicateur technique a été créé par Gerald Appel en 1979.
 * Cet indicateur s’appuie sur la différence entre 2 moyennes mobiles.
 *
 * https://www.botraiders.com/apprendre-bourse/analyser-la-bourse/analyse-technique/macd
 */
const MovingAverage = require("./MovingAverage");

class MACD {

    /**
     *
     * @param {ItemCollection} items
     * @param {number} period1
     * @param {number} period2
     *
     * @return {number}
     */
    static calcul(items, period1= 12, period2 = 26) {
        let mme1 = MovingAverage.exponential(items.getNLasts(period1));
        let mme2 = MovingAverage.exponential(items.getNLasts(period2));

        return mme1 - mme2;
    }
}

module.exports = MACD;