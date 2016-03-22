// import { createStore, combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux-immutablejs";
import { handleCallApi } from "./middleware/GrappaAPI";
import theses from "./thesis/Thesis.reducer";

const logger = store => next => action => {
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  return result;
}

const combinedReducers = combineReducers({
  theses,
});

// const createStoreWithMiddleware = applyMiddleware(thunk, thesisapi)(createStore)

const store = createStore(combinedReducers, applyMiddleware(logger, handleCallApi));
// const store = createStore(combinedReducers, applyMiddleware(logger));

export default store;