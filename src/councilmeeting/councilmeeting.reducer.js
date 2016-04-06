/*
* The reducer to define the changes to the state in accordance to the actions passed to it
* in regard to adding or getting councilmeetings.
*/
import { fromJS } from "immutable";
import {
   COUNCILMEETING_GET_ALL_SUCCESS,
  // COUNCILMEETING_GET_ALL_FAILURE,
  COUNCILMEETING_SAVE_ONE_SUCCESS,
  // COUNCILMEETING_SAVE_ONE_FAILURE,
} from "./councilmeeting.actions";

/*
*Defines what the intial state is when no changes have yet been done to the state.
*/
const INITIAL_STATE = fromJS({
  councilmeetinglist: [
    {
      id: 1,
      date: "date1",
    },
    {
      id: 2,
      date: "date2",
    },
    {
      id: 3,
      date: "date3",
    },
  ],
});

/*
* The function that handles the different state changes depending on which case
* has been passed to it from councilmeeting.actions.
* @param state The state, which is INITIAL_STATE by default, but is modified in accordance
* to all the changes thus far.
* @param action One of the previously defined actions from councilmeeting.actions that defines
* which case is relevant.
* @return The new state created by the modification of the previous one.
*/
export default function (state = INITIAL_STATE, action) {
  console.log("reducer löytyi!");
  switch (action.type) {
    case COUNCILMEETING_SAVE_ONE_SUCCESS:
      return state.updateIn(["councilmeetinglist"], list => list.concat(fromJS(action.payload)));
    case COUNCILMEETING_GET_ALL_SUCCESS:
      return state.updateIn(["councilmeetinglist"], list => list.concat(fromJS(action.payload)));
    default:
      return state;
  }
}
