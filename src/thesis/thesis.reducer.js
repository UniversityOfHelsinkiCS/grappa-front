import { fromJS } from "immutable";

import {
  THESIS_GET_ALL_SUCCESS,
  // THESIS_GET_ALL_FAILURE,
  THESIS_RESET_ALL_REQUEST,
  // THESIS_SAVE_ONE_REQUEST,
   THESIS_SAVE_ONE_SUCCESS,
  // THESIS_SAVE_ONE_FAILURE,
} from "./thesis.actions";

const INITIAL_STATE = fromJS({
  theseslist: [
    {},
  ],
});

export default function (state = INITIAL_STATE, action) {
  console.log("gothere")
  switch (action.type) {
    case THESIS_GET_ALL_SUCCESS:
    console.log("andhere")
      return state.updateIn(["theseslist"], list => list.concat(fromJS(action.payload)));
    case THESIS_RESET_ALL_REQUEST:
    console.log("andthere")
      return state.merge(INITIAL_STATE);
     case THESIS_SAVE_ONE_SUCCESS:
       return state.updateIn(["theseslist"], list => list.push(Map(...action.payload)));
    default:
      return state;
  }
}
