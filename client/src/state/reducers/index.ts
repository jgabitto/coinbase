import { combineReducers } from "redux";
import pricesDataReducer from "./pricesDataReducer";
import lineChartDataReducer from "./lineChartDataReducer";
import { PricesData, LineChartData } from "../actions";

export interface StoreState {
  pricesData: PricesData[];
  lineChartData: LineChartData;
}

export const reducers = combineReducers<StoreState>({
  pricesData: pricesDataReducer,
  lineChartData: lineChartDataReducer,
});
