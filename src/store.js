import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
import { combineReducers } from "redux-immutablejs";
import logger from "./middleware/logger";
import { handleCallApi } from "./middleware/grappaAPI";
import theses from "./thesis/thesis.reducer";
import councilmeetings from "./councilmeeting/councilmeeting.reducer";
import thesisprogress from "./thesisprogress/thesisprogress.reducer";

const combinedReducers = combineReducers({
  theses,
  councilmeetings,
  thesisprogress,
});

const store = createStore(combinedReducers, applyMiddleware(logger, handleCallApi));
export default store;
