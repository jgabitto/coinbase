import { Dispatch } from "redux";
import axios from "axios";

import { ActionType } from "../action-types";
import {
  FetchLineChartDataAction,
  FetchPricesDataAction,
  PricesData,
  LineChartData,
} from "../actions/index";

const PRICE_DATA_URL = "/get-prices-data";
const LINE_CHART_DATA = "/get-line-chart-data";

export const fetchPricesData = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<PricesData[]>(PRICE_DATA_URL);

    dispatch<FetchPricesDataAction>({
      type: ActionType.FETCH_PRICES_DATA,
      payload: response.data,
    });
  };
};

export const fetchLineChartData = (id: string) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.post<LineChartData>(LINE_CHART_DATA, {
      data: { id },
    });

    dispatch<FetchLineChartDataAction>({
      type: ActionType.FETCH_LINECHART_DATA,
      payload: response.data,
    });
  };
};
