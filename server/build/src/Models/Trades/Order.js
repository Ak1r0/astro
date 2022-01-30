"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Order {
    id;
    orderInfo;
    isCompleted = false;
    _onComplete = [];
    constructor(id, orderInfo) {
        this.id = id;
        this.orderInfo = orderInfo;
        this.complete()
            .then((order) => {
            this.isCompleted = false;
            this._onComplete.forEach((fn) => fn(order));
        });
    }
    onComplete(fn) {
        this._onComplete.push(fn);
    }
    async complete() {
        return new Promise(async (resolve, reject) => {
            if (this.isCompleted)
                resolve(this);
            try {
                // let exchangeOrder = await this.orderInfo.exchange.getOrder(this);
                // if ('FILLED' === exchangeOrder.status) {
                //     this.isCompleted = true;
                // }
                //this.exchangeInfo = exchangeOrder;
                resolve(this);
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
exports.default = Order;
//# sourceMappingURL=Order.js.map