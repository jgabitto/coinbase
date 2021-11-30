import { CryptoInfo, Action, ActionTypes } from "../actions";

export const cryptoInfoReducer = (state: CryptoInfo[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.fetchCryptoInfo:
      return action.payload;
    default:
      return state;
  }
};
