import { Map, fromJS } from "immutable";
import {
  USERS_GET_ALL_SUCCESS,
  USERS_GET_ALL_FAILURE,

} from "./usermanagement.actions";

const INITIAL_STATE = fromJS({
  users: [
    {},
  ],
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USERS_GET_ALL_SUCCESS:
      return state.mergeIn(["users"], fromJS(action.payload));
    case USERS_GET_ALL_FAILURE:
    // probably should display error message?
      return state;
    default:
      return state;
  }
}
