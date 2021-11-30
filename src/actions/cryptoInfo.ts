import { Dispatch } from "redux";
import axios from "axios";

import { ActionTypes } from "./types";

const url =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

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
  type: ActionTypes.fetchCryptoInfo;
  payload: CryptoInfo[];
}

export const fetchCryptoInfo = () => {
  return async (dispatch: Dispatch) => {
    let config: object = {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.REACT_APP_COINMARKET_API,
      },
    };
    const response = await axios.get<CryptoInfo[]>(url, config);

    dispatch<FetchCryptoInfoAction>({
      type: ActionTypes.fetchCryptoInfo,
      payload: response.data,
    });
  };
};
