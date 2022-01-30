

export type OrderType = {
    qty: number,
    of: string,
    forQty: number,
    forAsset: string,
    side: "BUY"|"SELL";
   // exchange: AbstractExchangeConnector, // sur quel exchange
};

export interface onCompleteCallableInterface {
    (order: Order): void
}

export default class Order {

    private isCompleted: boolean = false;
    private _onComplete: onCompleteCallableInterface[] = [];

    constructor(public readonly id:number, private orderInfo: OrderType) {

        this.complete()
            .then((order: Order) => {
               this.isCompleted = false;
               this._onComplete.forEach((fn) => fn(order));
            });
    }

    onComplete(fn: onCompleteCallableInterface) {
        this._onComplete.push(fn);
    }

    private async complete(): Promise<Order> {
        return new Promise<Order>(async (resolve, reject) => {
            if (this.isCompleted) resolve(this);
            try {
                // let exchangeOrder = await this.orderInfo.exchange.getOrder(this);
                // if ('FILLED' === exchangeOrder.status) {
                //     this.isCompleted = true;
                // }
                //this.exchangeInfo = exchangeOrder;
                resolve(this);
            } catch (e) {
                reject(e);
            }
        })
    }
}
