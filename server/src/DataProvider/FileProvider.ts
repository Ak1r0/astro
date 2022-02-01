import AbstractProvider from "./AbstractProvider";
import * as dfd from "danfojs-node";
import * as path from "path";
import {dataFrameLength} from "../helpers";

export default class FileProvider extends AbstractProvider {

    private sourceData: {[filename: string]: dfd.DataFrame} = {};

    private index = 500;
    private maxLength = 0;

    async fetch(pair: string, timeframe: string): Promise<dfd.DataFrame> {

        let fileName = pair.replace('/', '_') + '-' + timeframe + '.json';

        if(this.sourceData[fileName] === undefined) {
            return this.loadFile(fileName);
        }

        if(++this.index >= this.maxLength){
            return Promise.reject('All data are read');
        }

        let df = this.sourceData[fileName].iloc({rows: [this.index]});
        return Promise.resolve(df);
    }

    async loadFile(fileName: string): Promise<dfd.DataFrame> {
        let filePath = path.resolve( `./data/${this.exchange.id}/${fileName}`);
        console.log('Loading data from file', filePath);

        try {
            let df = await dfd.readJSON(filePath) as dfd.DataFrame;
            df.resetIndex({inplace:true});
            df.rename({'0': 'timestamp', '1': 'open', '2': 'high', '3':'low', '4':'close', '5':'volume'}, {inplace:true});
            this.maxLength = dataFrameLength(df);
            this.sourceData[fileName] = df;

            console.log(this.maxLength, 'data loaded from file');

            return df.head(this.index);
        }
        catch (e) {
            console.log(e);
            return Promise.reject(e);
        }
    }
}
