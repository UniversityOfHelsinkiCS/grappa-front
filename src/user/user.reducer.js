import { fromJS } from "immutable";
import {
  USER_GET_ALL_SUCCESS,
  USER_GET_ALL_FAILURE,
  USER_UPDATE_ONE_SUCCESS,
  USER_UPDATE_ONE_FAILURE,
  USER_DELETE_ONE_SUCCESS,
  USER_DELETE_ONE_FAILURE,
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
      return state.updateIn(["users"], users =>
        users.map(user => {
          if (user.get("id") === action.sent.id) {
            return fromJS(action.sent);
          }
          return user;
        })
      );
    case USER_UPDATE_ONE_FAILURE:
    // probably should display error message?
      return state;
    case USER_DELETE_ONE_SUCCESS:
      return state.updateIn(["users"], list =>
        list.filter(user => {
          if (user.get("id") !== action.sent.id) {
            return user;
          }
        })
      );
    case USER_DELETE_ONE_FAILURE:
      return state;
    default:
      return state;
  }
}
