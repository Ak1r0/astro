const Timeframe = require("../Chart/Timeframe");
const AverageMobile = require("./MovingAverage");
const printer = require("../Services/Printer");
const MovingAverage = require("./MovingAverage");

/**
 * Le Relative Strenght Index (RSI),
 * que l’on pourrait traduire en français par "index de force relative",
 * est un des indicateurs techniques les plus utilisés par les traders et les investisseurs.
 *
 * @see https://www.botraiders.com/apprendre-bourse/analyser-la-bourse/analyse-technique/relative-strength-index
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

        for(let n = 0; n < timeframe.count; n++){
            /** @var {Tick} **/
            let tick = timeframe.at(n);

            if(tick.open < tick.close) {
                H += tick.close - tick.open;
                Hn++;
            }
            else {
                B += tick.open - tick.close;
                Bn++;
            }
        }

        let Hx = H / Hn;
        let Bx = B / Bn;

        printer.temp('log', 'Hx', Hx);
        printer.temp('log', 'Bx', Bx);
        printer.temp('log', 'Hx - Bx', Hx - Bx);

        return 100 * Hx / (Hx - Bx);
    }

    /**
     * @param {Timeframe} timeframe
     */
    static calcul2(timeframe) {
        let H = new Timeframe(timeframe.config);
        let B = new Timeframe(timeframe.config);

        for(let n = 0; n < timeframe.count; n++){
            /** @var {Tick} **/
            let tick = timeframe.at(n);

            if(tick.open < tick.close) {
                H.add(tick);
            }
            else {
                B.add(tick)
            }
        }

        let Hx = MovingAverage.arithmetic(H);
        let Bx = MovingAverage.arithmetic(B);

        printer.temp('log', '2 Hx', Hx);
        printer.temp('log', '2 Bx', Bx);
        printer.temp('log', '2 Hx - Bx', Hx - Bx);

        return 100 * Hx / (Hx - Bx);
    }
}

module.exports = RSI;