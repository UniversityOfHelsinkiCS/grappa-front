import { fromJS } from "immutable";
import {
  EMAIL_DRAFT_GET_ALL_SUCCESS,
  EMAIL_DRAFT_GET_ALL_FAILURE,
} from "./email.actions";

/**
*Defines what the intial state is when no changes have yet been done to the state.
*/
const INITIAL_STATE = fromJS({
  emailDrafts: [],
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case EMAIL_DRAFT_GET_ALL_SUCCESS:
      return state.mergeIn(["emailDrafts"], fromJS(action.payload));
    case EMAIL_DRAFT_GET_ALL_FAILURE:
      return state;
    default:
      return state;
  }
}
