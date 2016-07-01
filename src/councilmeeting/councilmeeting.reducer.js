/**
* The reducer to define the changes to the state in accordance to the actions passed to it
* in regard to adding or getting councilmeetings.
*/
import { fromJS } from "immutable";
import {
  COUNCILMEETING_GET_ALL_SUCCESS,
  COUNCILMEETING_GET_ALL_FAILURE,
  COUNCILMEETING_SAVE_ONE_SUCCESS,
  COUNCILMEETING_SAVE_ONE_FAILURE,
} from "./councilmeeting.actions";

/**
*Defines what the intial state is when no changes have yet been done to the state.
*/
const INITIAL_STATE = fromJS({
  councilmeetings: [],
});

/**
* The function that handles the different state changes depending on which case
* has been passed to it from councilmeeting.actions.
* @param state The state, which is INITIAL_STATE by default, but is modified in accordance
* to all the changes thus far.
* @param action One of the previously defined actions from councilmeeting.actions that defines
* which case is relevant.
* @return The new state created by the modification of the previous one.
*/
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case COUNCILMEETING_SAVE_ONE_SUCCESS:
      return state.updateIn(["councilmeetings"], list => {
        const index = list.findIndex(meeting => {
          if (new Date(meeting.get("date")) > new Date(action.payload.date)) {
            return meeting;
          }
        });
        return index !== -1 ? list.splice(index, 0, fromJS(action.payload)) : list.push(fromJS(action.payload));
      });
    case COUNCILMEETING_SAVE_ONE_FAILURE:
      return state;
    case COUNCILMEETING_GET_ALL_SUCCESS:
      const sorted = action.payload.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      return state.mergeIn(["councilmeetings"], fromJS(sorted));
    case COUNCILMEETING_GET_ALL_FAILURE:
      return state;
    default:
      return state;
  }
}

const sortMeetings = (meetings) => {
  return meetings.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
};
