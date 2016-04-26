import { fromJS } from "immutable";
import {
  USER_GET_ALL_SUCCESS,
  USER_GET_ALL_FAILURE,
  USER_UPDATE_ONE_SUCCESS,
  USER_UPDATE_ONE_FAILURE,
  USER_DECLINE_ONE_SUCCESS,
  USER_DECLINE_ONE_FAILURE,
} from "./user.actions";

const INITIAL_STATE = fromJS({
  users: [],
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_GET_ALL_SUCCESS:
      return state.mergeIn(["users"], fromJS(action.payload));
    case USER_GET_ALL_FAILURE:
    // probably should display error message?
      return state;
    case USER_UPDATE_ONE_SUCCESS:
      const users = state.get("users").toJS();
      const updated = users.map(user => {
        if (user.id === action.sent.id) {
          return action.sent;
        }
        return user;
      });
      return state.mergeIn(["users"], fromJS(updated));
    case USER_UPDATE_ONE_FAILURE:
    // probably should display error message?
    case USER_DECLINE_ONE_SUCCESS:
      return state;
    case USER_DECLINE_ONE_FAILURE:
      return state;
    default:
      return state;
  }
}
