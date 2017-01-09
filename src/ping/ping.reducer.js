import { fromJS } from "immutable";

const INITIAL_STATE = fromJS({
  timerId: undefined,
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_TIMER":
      return state.merge({
        timerId: action.payload.timerId,
      });
    case "UNSET_TIMER":
      clearTimeout(state.toJS().timerId);
      return state;
    default:
      return state;
  }
}
