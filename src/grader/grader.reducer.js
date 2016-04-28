/*
* Reducer to define the changes to the state in accordance to the actions passed to it
* in regard to listing, adding and viewing theses.
*/
import { fromJS } from "immutable";
import {
  GRADER_UPDATE_SUCCESS,
  GRADER_UPDATE_FAILURE,
} from "./grader.actions";

/**
*Defines what the intial state is when no changes have yet been done to the state.
*/
const INITIAL_STATE = fromJS({
  theses: [],
  linkSent: "not_tried",
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GRADER_UPDATE_SUCCESS:
      return state.updateIn(["linkSent"], () => "success");
    case GRADER_UPDATE_FAILURE:
      return state.updateIn(["linkSent"], () => "failed");
    default:
      console.log("returning default state");
      return state;
  }
}
