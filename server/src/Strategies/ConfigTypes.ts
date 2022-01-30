import {ExchangeId} from "ccxt";

export type DataframeType = {
    pair: string;
    interval: string;
    exchangeId: ExchangeId;
};

export type IndicatorConfig = {
    indicator: string,
    period: number,
    dataframe: DataframeType;
}
