import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    const priceABC = (serverRespond[0].top_ask_price + serverRespond[0].top_bid_price) / 2;
    const priceDEF = (serverRespond[1].top_ask_price + serverRespond[1].top_bid_price) / 2;
    const ratio = priceABC / priceDEF;
    const upperBound = 1 + 0.05; //1.05
    const lowerBound = 1 - 0.05; //0.95
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio, 
      timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ? serverRespond[0].timestamp : serverRespond[1].timestamp,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
      };
  }
}


/* Thought Process

The way I thought about this was that the displayed data needed to change in the graph. We would have to use different data in order
to collect the accurate data needed to display accurate stock price monitoring

*/


/* Explanation

Two stocks will be collected and the ratio will be calculated to create an accurate rate for analysis. The upper and lower bounds are there
to help traders analyze an determine a trading opportunity. The graph is visually displayed in an appealing way to make anaylsis easier.

*/
