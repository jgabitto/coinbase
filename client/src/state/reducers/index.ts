import { combineReducers } from "redux";
import cryptoInfoReducer from "./cyptroInfoReducer";
import { CryptoInfo } from "../actions";

export interface StoreState {
  cryptoInfo: CryptoInfo[];
}

export const reducers = combineReducers<StoreState>({
  cryptoInfo: cryptoInfoReducer,
});
