import {unitOfTime} from "moment";

export default class TimeframeConfig {
    readonly baseCurrency: string;
    readonly quotedCurrency: string;
    readonly interval: number;
    readonly unitOfTime: unitOfTime.Base;

    constructor(
        baseCurrency:string = "BTC",
        quotedCurrency:string = "EUR",
        interval:number=  1,
        unitOfTime:unitOfTime.Base = "minutes",
    ) {
        this.baseCurrency = baseCurrency;
        this.quotedCurrency = quotedCurrency;
        this.interval = interval;
        this.unitOfTime = unitOfTime;
    }

    get pair(): string {
        return this.baseCurrency+this.quotedCurrency;
    }

    get name(): string {
        return this.baseCurrency+this.quotedCurrency+'_'+this.interval+this.unitOfTime;
    }
}
