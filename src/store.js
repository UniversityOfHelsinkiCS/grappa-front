// import { createStore, combineReducers } from "redux";
import { createStore } from "redux";
import { combineReducers } from "redux-immutablejs";
import theses from "./thesis/Thesis.reducer";

const combinedReducers = combineReducers({
  theses
});

// export const makeStore = () => ({
//   reducers: createStore(combinedReducers),
// });

export const makeStore = createStore(combinedReducers);
