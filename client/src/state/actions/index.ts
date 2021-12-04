import { ActionType } from "../action-types";

export interface CryptoInfo {
  image: string;
  market_cap_rank: number;
  name: string;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: number;
  market_cap: number;
  circulating_supply: number;
  sparklineSevenDays: { [price: string]: number[] };
}

export interface FetchCryptoInfoAction {
  type: ActionType.FETCH_CRYPTO_INFO;
  payload: CryptoInfo[];
}

export type Action = FetchCryptoInfoAction;
