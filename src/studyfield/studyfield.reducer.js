import { fromJS } from "immutable";
import {
  STUDYFIELD_GET_ALL_SUCCESS,
  STUDYFIELD_GET_ALL_FAILURE,
} from "./studyfield.actions";

const INITIAL_STATE = fromJS({
  studyfields: [],
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case STUDYFIELD_GET_ALL_SUCCESS:
      return state.merge(fromJS({
        studyfields: action.payload,
      }));
      // return state.updateIn(["studyfields"], fields => action.payload);
    default:
      return state;
  }
}
