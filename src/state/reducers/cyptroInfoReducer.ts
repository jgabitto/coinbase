import { CryptoInfo, Action } from "../actions";
import { ActionType } from "../action-types";

const cryptoInfoReducer = (state: CryptoInfo[] = [], action: Action) => {
  switch (action.type) {
    case ActionType.FETCH_CRYPTO_INFO:
      return action.payload;
    default:
      return state;
  }
};

export default cryptoInfoReducer;
