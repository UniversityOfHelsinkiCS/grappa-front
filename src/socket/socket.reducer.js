import { fromJS } from "immutable";

const INITIAL_STATE = fromJS({
  socket: undefined,
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_SOCKET":
      return state.merge({
        socket: action.payload.socket,
      });
    case "UNSET_SOCKET":
      return state;
    default:
      return state;
  }
}
