/*
* The reducer to define the changes to the state in accordance to the actions passed to it
* in regard to adding or getting councilmeetings.
*/
import { fromJS } from "immutable";
import {
  PDF_GET_SUCCESS,
  PDF_GET_FAILURE,
} from "./pdf.actions";

/*
*Defines what the intial state is when no changes have yet been done to the state.
*/
const INITIAL_STATE = fromJS({
  pdfs: [],
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
  switch (action.type) {
    case PDF_GET_SUCCESS:
      return state.updateIn(["pdfs"], list => list.push(fromJS(action.payload)));
    case PDF_GET_FAILURE:
      return state;
    default:
      return state;
  }
}
