// import { createStore, combineReducers } from "redux";
import { createStore } from "redux";
import { combineReducers } from "redux-immutablejs";
import theses from "./thesis/Thesis.reducer";
import turha from "./app/Turha.reducer";

const combinedReducers = combineReducers({
  theses,
  turha,
});

// export const makeStore = () => ({
//   reducers: createStore(combinedReducers),
// });

export const makeStore = createStore(combinedReducers);
