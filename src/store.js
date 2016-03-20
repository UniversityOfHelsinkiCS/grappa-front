// import { createStore, combineReducers } from "redux";
import { createStore } from "redux";
import { combineReducers } from "redux-immutablejs";
import testi from "./testi-item/TestiItem.reducer";
import turha from "./app/Turha.reducer";

const combinedReducers = combineReducers({
  testi,
  turha,
});

export const makeStore = () => {
  return createStore(combinedReducers);
}
