import { Map, fromJS } from "immutable";
import {
  USERS_GET_ALL_SUCCESS,
  USERS_GET_ALL_FAILURE,
  USER_UPDATE_ONE_SUCCESS,
  USER_UPDATE_ONE_FAILURE,
  USER_DECLINE_SUCCESS,
  USER_DECLINE_FAILURE,
} from "./usermanagement.actions";

const INITIAL_STATE = fromJS({
  users: [],
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USERS_GET_ALL_SUCCESS:
      return state.mergeIn(["users"], fromJS(action.payload));
    case USERS_GET_ALL_FAILURE:
    // probably should display error message?
      return state;
    case USER_UPDATE_ONE_SUCCESS:
      return state.updateIn(["users"], list => list.push(new Map(action.payload)));
    case USER_UPDATE_ONE_FAILURE:
    // probably should display error message?
    case USER_DECLINE_SUCCESS:
      return state;
    case USER_DECLINE_FAILURE:
      return state;
    // case USER_UPDATE_ONE_LOCAL:
    //   return 
    default:
      return state;
  }
}
