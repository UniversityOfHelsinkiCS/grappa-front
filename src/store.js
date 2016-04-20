import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
import { combineReducers } from "redux-immutablejs";
import logger from "./middleware/logger";
import { handleCallApi } from "./middleware/grappaAPI";
import auth from "./auth/auth.reducer";
import thesis from "./thesis/thesis.reducer";
import councilmeeting from "./councilmeeting/councilmeeting.reducer";
import thesisprogress from "./thesisprogress/thesisprogress.reducer";

const combinedReducers = combineReducers({
  auth,
  thesis,
  councilmeeting,
  thesisprogress,
});

const store = createStore(combinedReducers, applyMiddleware(logger, handleCallApi));
export default store;
