import { fromJS } from "immutable";

import {
THESISPROGRESS_GET_ALL_SUCCESS,
THESISPROGRESS_GET_ALL_FAILURE,
THESISPROGRESS_UPDATE_ONE_SUCCESS,
THESISPROGRESS_UPDATE_ONE_FAILURE,
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
    case THESISPROGRESS_UPDATE_ONE_SUCCESS:
      return state.updateIn(["linkSent"], () => "success");
    case THESISPROGRESS_UPDATE_ONE_FAILURE:
      return state.updateIn(["linkSent"], () => "failed");
    default:
      return state;
  }
}
