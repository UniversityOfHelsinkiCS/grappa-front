import { fromJS } from "immutable";

const INITIAL_STATE = fromJS({
  user: {},
  token: "",
  expires: undefined,
  loading: false,
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOGIN_USER_SUCCESS":
      return state.merge({
        user: action.payload.user,
        token: action.payload.token,
        expires: action.payload.expires,
      });
    case "LOGIN_USER_FAILURE":
      return state;
    case "USER_UPDATE_ONE_SUCCESS":
      return state.updateIn(["user"], user => {
        if (user.get("id") === action.payload.id) {
          return fromJS(action.payload);
        }
        return user;
      });
    default:
      return state;
  }
}
