import { ActionType } from "../action-types";

export interface CryptoInfo {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  max_supply: number;
  circulating_supply: number;
  total_supply: number;
  platform: object | null;
  quote: {
    [currency: string]: object;
  };
}

export interface FetchCryptoInfoAction {
  type: ActionType.FETCH_CRYPTO_INFO;
  payload: CryptoInfo[];
}

export type Action = FetchCryptoInfoAction;
