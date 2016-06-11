import { fromJS } from "immutable";
import {
  ETHESIS_SENT_SUCCESS,
  ETHESIS_SENT_FAILURE,
} from "./ethesis.actions";

const INITIAL_STATE = fromJS({
  linkSent: "",
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ETHESIS_SENT_SUCCESS:
      return state.merge({
        linkSent: "success",
      });
    case ETHESIS_SENT_FAILURE:
      return state.merge({
        linkSent: "failure",
      });
    default:
      return state;
  }
}
