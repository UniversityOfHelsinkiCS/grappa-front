/**
* Reducer to define the changes to the state in accordance to the actions passed to it
* in regard to listing, adding and viewing theses.
*/
import { fromJS } from "immutable";

/**
*Defines what the intial state is when no changes have yet been done to the state.
* todo: ethesis should probably have it's own reducer
*/
const INITIAL_STATE = fromJS({
  theses: [],
});

/**
 * The default function for handling the state change
 *
 * THESIS_GET_ALL_SUCCESS: current theses are merged with those fetched from API.
 * THESIS_SAVE_ONE_SUCCESS: received new thesis is added to the state's theses
 * THESIS_UPDATE_ONE_SUCCESS: idk what this does
 * @param {Object} state - Current state of the reducer. INITIAL_STATE by default, but is
 * modified in accordance to all the changes thus far.
 * @param {Object} action - Action dispatched from a Smart-component or GrappaAPI which is
 * created from one of the action-creators from thesis.actions.js
 * @return {Object} state - State to replace the current state
 */
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "THESIS_GET_ALL_SUCCESS":
      // lolz if no theses found action.payload is null or smthing
      // fuging hell man this shit
      if (!action.payload || action.payload === null) {
        return state.merge(fromJS({
          theses: [],
        }));
      }
      /*
       * This silliness is because react bootstrap table doesn't deal with nested objects
       */
      const theses = action.payload;
      for (const thesis in theses) {
        if ({}.hasOwnProperty.call(theses, thesis) && thesis.ThesisProgress) {
          thesis.isDone = thesis.ThesisProgress.isDone;
        }
      }
      return state.merge(fromJS({
        theses,
      }));
    // return state.updateIn(["theses"], list => list.concat(fromJS(action.payload)));
    case "THESIS_GET_ALL_FAILURE":
    // probably should display error message?
      return state;
    case "THESIS_SAVE_ONE_SUCCESS":
      // return state;
      return state.updateIn(["theses"], theses => fromJS([...theses, action.payload]));
    case "THESIS_SAVE_ONE_FAILURE":
      return state;
    case "THESIS_UPDATE_ONE_SUCCESS":
      return state.updateIn(["theses"], thesis =>
        thesis.map(thesis => {
          if (thesis.get("id") === action.sent.id) {
            return fromJS(action.sent);
          }
          return thesis;
        })
      );
    case "THESIS_UPDATE_ONE_FAILURE":
      return state;
    case "THESIS_DOWNLOAD_SUCCESS":
      return state;
    case "THESISPROGRESS_UPDATE_ONE_SUCCESS":
      return state.updateIn(["theses"], thesis =>
        thesis.map(thesis => {
          if (thesis.get("ThesisProgress").get("id") === action.sent.id) {
            return thesis.mergeIn(["ThesisProgress"], fromJS(action.sent));
          }
          return thesis;
        })
      );
    case "THESISPROGRESS_UPDATE_ONE_FAILURE":
      return state;
    case "SEND_REMINDER_SUCCESS":
      return state.updateIn(["theses"], thesis =>
        thesis.map(thesis => {
          if (thesis.get("id") === action.sent.thesisId) {
            return thesis.mergeIn(["ThesisProgress", action.sent.reminderType], fromJS(action.payload));
          }
          return thesis;
        })
      );
    default:
      return state;
  }
}
