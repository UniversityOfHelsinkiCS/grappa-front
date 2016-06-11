import { fromJS } from "immutable";
import {
  GRADER_UPDATE_MANY_SUCCESS,
  GRADER_UPDATE_MANY_FAILURE,
} from "./grader.actions";

const INITIAL_STATE = fromJS({
  graders: [],
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GRADER_UPDATE_MANY_SUCCESS:
      console.log("should update graders yo");
      return state.updateIn(["linkSent"], () => "success");
    case GRADER_UPDATE_MANY_FAILURE:
      return state;
    default:
      return state;
  }
}
