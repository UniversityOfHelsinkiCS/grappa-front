/**
* Reducer to define the changes to the state in accordance to the actions passed to it
* in regard to listing, adding and viewing theses.
*/
import { fromJS } from "immutable";

/**
* Defines what the intial state is when no changes have yet been done to the state.
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
      // if no theses found action.payload is null
      if (!action.payload || action.payload === null) {
        return state.merge(fromJS({
          theses: [],
        }));
      }
      /*
       * React bootstrap table doesn't deal with nested objects
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
    case "THESIS_SAVE_ONE_SUCCESS":
      const exists = state.get("theses").find(grader => {
        return grader.get("id") === action.payload.id;
      })
      if (exists) return state;
      return state.updateIn(["theses"], theses => fromJS([...theses, action.payload]));
    case "THESIS_UPDATE_ONE_SUCCESS":
      // data is sent from the server through websocket in JSON
      let data;
      if (action.payload.constructor === FormData) {
        data = JSON.parse(action.payload.get("json"));
      } else {
        data = action.payload;
      }
      return state.updateIn(["theses"], theses =>
        theses.map(thesis => {
          if (thesis.get("id") === data.id) {
            return fromJS(data);
          }
          return thesis;
        })
      );
    case "THESIS_MOVE_SUCCESS":
      return state.updateIn(["theses"], thesis =>
        thesis.map(thesis => {
          if (action.payload.thesisIds.indexOf(thesis.get("id")) !== -1) {
            return thesis.merge(fromJS({
              CouncilMeetingId: action.payload.CouncilMeetingId,
              CouncilMeeting: action.payload.CouncilMeeting,
            }));
          }
          return thesis;
        })
      );
    // case "THESISPROGRESS_UPDATE_ONE_SUCCESS":
    //   return state.updateIn(["theses"], theses =>
    //     theses.map(thesis => {
    //       if (thesis.get("ThesisProgress").get("id") === action.sent.id) {
    //         return thesis.mergeIn(["ThesisProgress"], fromJS(action.sent));
    //       }
    //       return thesis;
    //     })
    //   );
    // case "THESISPROGRESS_UPDATE_ONE_FAILURE":
    //   return state;
    case "THESISPROGRESS_UPDATE_STATUS":
      return state.updateIn(["theses"], theses =>
        theses.map(thesis => {
          if (action.payload.thesisIds.indexOf(thesis.get("id")) !== -1) {
            return thesis.mergeIn(["ThesisProgress", action.payload.status], true);
          }
          return thesis;
        })
      );
    case "SEND_REMINDER_SUCCESS":
      return state.updateIn(["theses"], thesis =>
        thesis.map(thesis => {
          if (thesis.get("id") === action.payload.ThesisId) {
            //TODO: Don't save thesisId again
            //TODO: Is setIn safe? Previously used mergeIn but it won't work if destination is null
            return thesis.setIn(["ThesisProgress", action.payload.type], fromJS(action.payload));
          }
          return thesis;
        })
      );
    default:
      return state;
  }
}
