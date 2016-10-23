import { fromJS } from "immutable";

const INITIAL_STATE = fromJS({
  linkSent: "",
  loading: false,
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ETHESIS_SENT_REQUEST":
      return state.merge({
        linkSent: "",
        loading: true,
      });
    case "ETHESIS_SENT_SUCCESS":
      return state.merge({
        linkSent: "success",
        loading: false,
      });
    case "ETHESIS_SENT_FAILURE":
      return state.merge({
        linkSent: "failure",
        loading: false,
      });
    default:
      return state;
  }
}
