const TickCollection = require("../DataCollector/TickCollection");
const AverageMobile = require("./MovingAverage");

/**
 * Le Relative Strenght Index (RSI),
 * que l’on pourrait traduire en français par "index de force relative",
 * est un des indicateurs techniques les plus utilisés par les traders et les investisseurs.
 *
 * @see https://www.botraiders.com/apprendre-bourse/analyser-la-bourse/analyse-technique/relative-strength-index
 */
class RSI {

    /**
     * @param {TickCollection} ticks
     */
    static calcul(ticks) {

        let H = new TickCollection();
        let B = new TickCollection();

        for(let n = 0; n < ticks.count; n++){
            /** @var {Tick} **/
            let tick = ticks.at(n);

            if(tick.open < tick.close) H.add(tick)
            else B.add(tick);
        }

        let Hx = AverageMobile.exponential(H);
        let Bx = AverageMobile.exponential(B);

        return 100 * Hx / (Hx - Bx);
    }
}

module.exports = RSI;