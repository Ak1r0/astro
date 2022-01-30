import AbstractItem from "./AbstractItem";
import moment from "moment";

export default class Tick extends AbstractItem {

    private symbol: string;
    private low: number;
    private high: number;
    private open: number;
    private close: number;
    private volume: number;
    public direction: any;
    public moment: moment.Moment;

    constructor(eventTime: number, symbol: string, low: number, high: number, open: number, close: number, volume: number) {
        super(eventTime);
        this.symbol = symbol;
        this.moment = moment(eventTime);
        this.low = low;
        this.high = high;
        this.open = open;
        this.close = close;
        this.volume = volume;
        this.direction = this.open < this.close ? 'UP' : 'DOWN';
    }

    get value(): number {
        return this.close
    }
}
