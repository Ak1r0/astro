"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractItem_1 = __importDefault(require("./AbstractItem"));
const moment_1 = __importDefault(require("moment"));
class Tick extends AbstractItem_1.default {
    symbol;
    low;
    high;
    open;
    close;
    volume;
    direction;
    moment;
    constructor(eventTime, symbol, low, high, open, close, volume) {
        super(eventTime);
        this.symbol = symbol;
        this.moment = (0, moment_1.default)(eventTime);
        this.low = low;
        this.high = high;
        this.open = open;
        this.close = close;
        this.volume = volume;
        this.direction = this.open < this.close ? 'UP' : 'DOWN';
    }
    get value() {
        return this.close;
    }
}
exports.default = Tick;
//# sourceMappingURL=Tick.js.map