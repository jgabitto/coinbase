import { ActionType } from "../action-types";

export interface PricesData {
  id: string;
  image: string;
  market_cap_rank: number;
  name: string;
  symbol: string;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: number;
  market_cap: number;
  circulating_supply: number;
  sparklineSevenDays: { [price: string]: number[] };
}

export interface LineChartData {
  prices: number[][];
}

export interface FetchPricesDataAction {
  type: ActionType.FETCH_PRICES_DATA;
  payload: PricesData[];
}

export interface FetchLineChartDataAction {
  type: ActionType.FETCH_LINECHART_DATA;
  payload: LineChartData;
}

export type Action = FetchPricesDataAction | FetchLineChartDataAction;
