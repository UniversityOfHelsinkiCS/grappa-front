import { fromJS } from "immutable";
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
} from "./auth.actions";

const INITIAL_STATE = fromJS({
  user: {
    id: 0,
    name: "",
    role: "",
  },
  loggedIn: false,
  token: "",
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      console.log(action);
      return state.merge({
        user: action.payload.user,
        loggedIn: true,
        token: action.payload.token,
      });
    case LOGIN_USER_FAILURE:
      return state;
    case LOGOUT_USER:
      console.log(INITIAL_STATE);
      return INITIAL_STATE;
    default:
      return state;
  }
}
