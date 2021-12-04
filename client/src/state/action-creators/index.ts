import { Dispatch } from "redux";
import axios from "axios";

import { ActionType } from "../action-types";
import { FetchCryptoInfoAction, CryptoInfo } from "../actions/index";

const url =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

export const fetchCryptoInfo = () => {
  return async (dispatch: Dispatch) => {
    // let config: object = {
    //   headers: {
    //     "X-CMC_PRO_API_KEY": process.env.REACT_APP_COINMARKET_API,
    //   },
    // };
    // const response = await axios.get<CryptoInfo[]>(url, config);
    const response = await axios.get<CryptoInfo[]>("/prices");

    dispatch<FetchCryptoInfoAction>({
      type: ActionType.FETCH_CRYPTO_INFO,
      payload: response.data,
    });
  };
};
