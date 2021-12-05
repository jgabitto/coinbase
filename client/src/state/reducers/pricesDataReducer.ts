import { PricesData, Action } from "../actions";
import { ActionType } from "../action-types";

const pricesDataReducer = (state: PricesData[] = [], action: Action) => {
  switch (action.type) {
    case ActionType.FETCH_PRICES_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default pricesDataReducer;
