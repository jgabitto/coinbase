import { LineChartData, Action } from "../actions";
import { ActionType } from "../action-types";

const lineChartDataReducer = (
  state: LineChartData = { prices: [[]] },
  action: Action
) => {
  switch (action.type) {
    case ActionType.FETCH_LINECHART_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default lineChartDataReducer;
