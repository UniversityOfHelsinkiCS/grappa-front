import { Map, fromJS } from "immutable";

import {
  THESIS_GET_ALL_SUCCESS,
  THESIS_GET_ALL_FAILURE,
  // THESIS_SAVE_ONE_REQUEST,
  THESIS_SAVE_ONE_SUCCESS,
  THESIS_SAVE_ONE_FAILURE,
} from "./thesis.actions";

const INITIAL_STATE = fromJS({
  theseslist: [
    {},
  ],
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case THESIS_GET_ALL_SUCCESS:
      return state.mergeIn(["theseslist"], fromJS(action.payload));
      // return state.updateIn(["theseslist"], list => list.concat(fromJS(action.payload)));
    case THESIS_GET_ALL_FAILURE:
    // probably should display error message?
      return state;
    case THESIS_SAVE_ONE_SUCCESS:
      return state.updateIn(["theseslist"], list => list.push(new Map(...action.payload)));
    case THESIS_SAVE_ONE_FAILURE:
    // probably should display error message?
      return state;
    default:
      return state;
  }
}
