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
    case "DISCONNECT_SOCKET":
      state.get("socket").disconnect();
      return INITIAL_STATE;
    default:
      return state;
  }
}
