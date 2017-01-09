import { fromJS } from "immutable";

const INITIAL_STATE = fromJS({
  timerId: undefined,
  loading: false,
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_TIMER":
      return state.merge({
        timerId: action.payload.timerId,
      });
    case "UNSET_TIMER":
      console.log(state.toJS())
      console.log("unsetting!", state.toJS().timerId)
      // if (state.get("timerId")) {
        clearTimeout(state.toJS().timerId);
      // }
      return state;
    default:
      return state;
  }
}
