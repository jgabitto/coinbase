import { Dispatch } from "redux";
import axios from "axios";

import { ActionType } from "../action-types";
import { FetchCryptoInfoAction, CryptoInfo } from "../actions/index";

const url = "/prices";

export const fetchCryptoInfo = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<CryptoInfo[]>(url);

    // const processedData = response.data.map((curr) => {
    //   return [
    //     {
    //       num: curr.market_cap_rank,
    //       name: curr.name,
    //       oneHPercentage: curr.price_change_percentage_1h_in_currency,
    //       twentyfourHPercentage: curr.price_change_percentage_24h,
    //       sevenDPercentage: curr.price_change_percentage_7d_in_currency,
    //       twentyfourHVolume: curr.total_volume,
    //       marketCap: curr.market_cap,
    //       circulatingSupply: curr.circulating_supply,
    //     },
    //   ];
    // });

    dispatch<FetchCryptoInfoAction>({
      type: ActionType.FETCH_CRYPTO_INFO,
      payload: response.data,
    });
  };
};
