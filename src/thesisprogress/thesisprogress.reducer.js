import { fromJS } from "immutable";

import {
THESISPROGRESS_GET_ALL_SUCCESS,
THESISPROGRESS_GET_ALL_FAILURE,
} from "./thesisprogress.actions";

const INITIAL_STATE = fromJS({
  thesisprogresses: [
    {},
  ],
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case THESISPROGRESS_GET_ALL_SUCCESS:
      return state.mergeIn(["thesisprogresses"], fromJS(action.payload));
    case THESISPROGRESS_GET_ALL_FAILURE:
    // probably should display error message?
    default:
      return state;
  }
}
