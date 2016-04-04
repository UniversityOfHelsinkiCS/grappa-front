import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
import { combineReducers } from "redux-immutablejs";
import logger from "./middleware/logger";
import { handleCallApi } from "./middleware/grappaAPI";
import theses from "./thesis/thesis.reducer";

const combinedReducers = combineReducers({
  theses,
});

const store = createStore(combinedReducers, applyMiddleware(logger, handleCallApi));

export default store;
