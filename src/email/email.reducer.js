import { fromJS } from "immutable";
import {
  EMAILDRAFT_GET_ALL_SUCCESS,
  EMAILDRAFT_GET_ALL_FAILURE,
  EMAILDRAFT_UPDATE_ONE_SUCCESS,
  EMAILDRAFT_UPDATE_ONE_FAILURE,
} from "./email.actions";

/**
*Defines what the intial state is when no changes have yet been done to the state.
*/
const INITIAL_STATE = fromJS({
  emaildrafts: [],
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case EMAILDRAFT_GET_ALL_SUCCESS:
      return state.mergeIn(["emaildrafts"], fromJS(action.payload));
    case EMAILDRAFT_GET_ALL_FAILURE:
      return state;
    case EMAILDRAFT_UPDATE_ONE_SUCCESS:
      return state.updateIn(["emaildrafts"], emaildrafts =>
        emaildrafts.map(emaildraft => {
          if (emaildraft.get("id") === action.sent.id) {
            return fromJS(action.sent);
          }
          return emaildraft;
        })
      );
    case EMAILDRAFT_UPDATE_ONE_FAILURE:
      return state;
    default:
      return state;
  }
}
