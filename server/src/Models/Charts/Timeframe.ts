import TimeframeConfig from "./TimeframeConfig";
import ItemCollection from "./ItemCollection";
import Tick from "./Tick";

export default class Timeframe extends ItemCollection<Tick> {

    constructor(public config: TimeframeConfig, items?: Tick[]) {
        super(items);
    }

    getOneXTimeBefore(time: number, from?: Tick): Tick|null {

        from = from ?? this.getLast();

        if(!from || 0 === this.size) {
            return null;
        }

        for(let n = this.size - 1; n >= 0; n--) {
            let tick = this.getAt(n);
            let diff = from.moment.diff(tick.moment, this.config.unitOfTime);
            if (diff == time && diff > 0) {
                return tick;
            }
        }

        return null;
    }

    getFrameXTimeBefore(time: number, from?: Tick): Timeframe {

        let frame = new Timeframe(this.config);
        from = from ?? this.getLast();

        if(!from || 0 === this.size) {
            return frame;
        }

        for(let n = this.size - 1; n >= 0; n--) {
            let tick = this.getAt(n);
            let diff = from.moment.diff(tick.moment, this.config.unitOfTime);
            if (diff <= time && diff >= 0) {
                frame.add(tick);
            }
        }

        return frame;
    }
}
