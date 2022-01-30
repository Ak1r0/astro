import AbstractProvider, {FetchType} from "./AbstractProvider";
import * as dfd from "danfojs-node";
import {Exchange, Params} from "ccxt";
import * as path from "path";
import * as fs from "fs";

export default class FileProvider extends AbstractProvider {

    private sourceData: {[filename: string]: any} = {};

    async fetch(pair: string, timeframe: string, fetchType: FetchType = 'fetchOHLCV', params?: Params): Promise<dfd.DataFrame> {

    }

    async loadHistory(pair: string, timeframe: string): Promise<dfd.DataFrame> {

        let fileName = pair.replace('/', '_') + '-' + timeframe + '.json';

        if(this.sourceData[fileName] === undefined) {
            let filePath = /*path.resolve*/( `./data/${this.exchange.id}`);
            let buffer = fs.readFileSync(filePath + '/' + fileName, 'utf8');
            this.sourceData[fileName] = JSON.parse(buffer);
        }

        let data = this.sourceData[fileName].slice(0, 500);

        if(0 === data.length){
            return Promise.reject('All data are read');
        }

        let df = new dfd.DataFrame(
            data,
            {columns: ['timestamp', 'open', 'high', 'low', 'close', 'volume']}
        );

        this.sourceData[fileName].shift();

        return Promise.resolve(df);
    }
}
