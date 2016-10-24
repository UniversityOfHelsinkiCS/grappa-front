import { fromJS } from "immutable";

const INITIAL_STATE = fromJS({
  graders: [],
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GRADER_GET_ALL_SUCCESS":
      // if (!action.payload || action.payload === null) {
      //   return state.mergeIn(["graders"], fromJS([]));
      // }
      return state.mergeIn(["graders"], fromJS(action.payload));
    case "GRADER_GET_ALL_FAILURE":
      return state;
    case "GRADER_SAVE_ONE_SUCCESS":
      return state.updateIn(["graders"], graders => fromJS([...graders, action.payload]));
    case "GRADER_SAVE_ONE_FAILURE":
      return state;
    case "GRADER_UPDATE_ONE_SUCCESS":
      return state.updateIn(["graders"], grader =>
        grader.map(grader => {
          if (grader.get("id") === action.sent.id) {
            return fromJS(action.sent);
          }
          return grader;
        })
      );
    case "GRADER_UPDATE_ONE_FAILURE":
      return state;
    case "GRADER_DELETE_ONE_SUCCESS":
      return state.updateIn(["graders"], list =>
        list.filter(grader => {
          if (grader.get("id") !== action.sent.id) {
            return grader;
          }
        })
      );
    case "GRADER_DELETE_ONE_FAILURE":
      return state;
    default:
      return state;
  }
}
