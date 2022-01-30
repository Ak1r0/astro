"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ItemCollection_1 = __importDefault(require("./ItemCollection"));
class Timeframe extends ItemCollection_1.default {
    config;
    constructor(config, items) {
        super(items);
        this.config = config;
    }
    getOneXTimeBefore(time, from) {
        from = from ?? this.getLast();
        if (!from || 0 === this.size) {
            return null;
        }
        for (let n = this.size - 1; n >= 0; n--) {
            let tick = this.getAt(n);
            let diff = from.moment.diff(tick.moment, this.config.unitOfTime);
            if (diff == time && diff > 0) {
                return tick;
            }
        }
        return null;
    }
    getFrameXTimeBefore(time, from) {
        let frame = new Timeframe(this.config);
        from = from ?? this.getLast();
        if (!from || 0 === this.size) {
            return frame;
        }
        for (let n = this.size - 1; n >= 0; n--) {
            let tick = this.getAt(n);
            let diff = from.moment.diff(tick.moment, this.config.unitOfTime);
            if (diff <= time && diff >= 0) {
                frame.add(tick);
            }
        }
        return frame;
    }
}
exports.default = Timeframe;
//# sourceMappingURL=Timeframe.js.map