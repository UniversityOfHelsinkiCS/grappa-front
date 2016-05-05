import { createStore, applyMiddleware, compose } from "redux";
import { combineReducers } from "redux-immutablejs";
import persistState from "redux-localstorage";
import { fromJS, Map } from "immutable";
import logger from "./middleware/logger";
import { handleCallApi } from "./middleware/grappaAPI";
import { manageState } from "./middleware/statusManager";

import auth from "./auth/auth.reducer";
import thesis from "./thesis/thesis.reducer";
import councilmeeting from "./councilmeeting/councilmeeting.reducer";
import thesisprogress from "./thesisprogress/thesisprogress.reducer";
import user from "./user/user.reducer";
import grader from "./grader/grader.reducer";
import email from "./email/email.reducer";
import emailstatus from "./emailstatus/emailstatus.reducer";
import flash from "./flash/flash.reducer";
import { LOGOUT_USER } from "./auth/auth.actions";

const combinedReducers = combineReducers({
  auth,
  thesis,
  councilmeeting,
  thesisprogress,
  user,
  grader,
  email,
  emailstatus,
  flash,
});

/*
 * Resets all states of reducers when logging out
 */
const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
    return combinedReducers(undefined, action);
  }
  return combinedReducers(state, action);
};

const createStoreWithMiddleware = applyMiddleware(logger, handleCallApi, manageState)(createStore);
const createPersistentStore = compose(
  persistState(["auth", "thesis"], {
    slicer: (paths) => (state) => state.filter((v, k) => paths.indexOf(k) !== -1),
    serialize: (subset) => JSON.stringify(subset.toJS()),
    deserialize: (serialized) => fromJS(JSON.parse(serialized)),
    merge: (initial, persisted) => new Map(initial).mergeDeep(persisted),
  })
)(createStoreWithMiddleware);

// const store = createPersistentStore(combinedReducers);
const store = createPersistentStore(rootReducer);

export default store;
