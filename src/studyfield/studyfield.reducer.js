import { fromJS } from "immutable";
import {
  STUDYFIELD_GET_ALL_SUCCESS,
  STUDYFIELD_GET_ALL_FAILURE,
  STUDYFIELD_SAVE_ONE_SUCCESS,
  STUDYFIELD_SAVE_ONE_FAILURE,
  STUDYFIELD_UPDATE_ONE_SUCCESS,
  STUDYFIELD_UPDATE_ONE_FAILURE,
} from "./studyfield.actions";

const INITIAL_STATE = fromJS({
  studyfields: [],
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case STUDYFIELD_GET_ALL_SUCCESS:
      return state.mergeIn(["studyfields"], fromJS(action.payload));
    case STUDYFIELD_GET_ALL_FAILURE:
      return state;
    case STUDYFIELD_SAVE_ONE_SUCCESS:
      return state.updateIn(["studyfields"], studyfields => fromJS([...studyfields, action.payload]));
    case STUDYFIELD_SAVE_ONE_FAILURE:
      return state;
    case STUDYFIELD_UPDATE_ONE_SUCCESS:
      return state.updateIn(["studyfields"], studyfields =>
        studyfields.map(studyfield => {
          if (studyfield.get("id") === action.sent.id) {
            return fromJS(action.sent);
          }
          return studyfield;
        })
      );
    case STUDYFIELD_UPDATE_ONE_FAILURE:
      return state;
    default:
      return state;
  }
}
