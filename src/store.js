// import { createStore, combineReducers } from "redux";
import { createStore } from "redux";
import { combineReducers } from "redux-immutablejs";
import testi from "./reducers/TestiItem.reducer";
import turha from "./reducers/Turha.reducer";

const combinedReducers = combineReducers({
  testi,
  turha,
});

export const makeStore = () => {
  return createStore(combinedReducers);
}
