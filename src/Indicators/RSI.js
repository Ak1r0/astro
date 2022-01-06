const Timeframe = require("../Chart/Timeframe");
const printer = require("../Services/Printer");

/**
 * Le Relative Strenght Index (RSI),
 * que l’on pourrait traduire en français par "index de force relative",
 * est un des indicateurs techniques les plus utilisés par les traders et les investisseurs.
 *
 * @see https://www.botraiders.com/apprendre-bourse/analyser-la-bourse/analyse-technique/relative-strength-index
 * @see https://stackoverflow.com/questions/22626238/calculate-rsirelative-strength-index-using-some-programming-language-js-c
 */
class RSI {

    /**
     * @param {Timeframe} timeframe
     */
    static calcul(timeframe) {

        let H = 0;
        let Hn = 0;
        let B = 0;
        let Bn = 0;

        for(let n = 1; n < timeframe.count; n++){
            /** @var {Tick} **/
            let tick = timeframe.at(n);
            /** @var {Tick} **/
            let previousTick = timeframe.at(n-1);

            if(previousTick.close < tick.close) {
                H += tick.close - previousTick.close;
                Hn++;
            }
            else {
                B += previousTick.close - tick.close;
                Bn++;
            }
        }

        let Hx = H / timeframe.count;
        let Bx = B / timeframe.count;

        // printer.temp('log', 'Hx', Hx);
        // printer.temp('log', 'Bx', Bx);
        // printer.temp('log', 'Hx - Bx', Hx - Bx);

        return 100 - (100 / (1 + Hx / Bx));
    }
}

module.exports = RSI;