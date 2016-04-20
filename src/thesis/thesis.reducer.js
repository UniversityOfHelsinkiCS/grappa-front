/*
* Reducer to define the changes to the state in accordance to the actions passed to it
* in regard to listing, adding and viewing theses.
*/
import { Map, fromJS } from "immutable";
import {
  THESIS_GET_ALL_REQUEST,
  THESIS_GET_ALL_SUCCESS,
  THESIS_GET_ALL_FAILURE,
  THESIS_SAVE_ONE_REQUEST,
  THESIS_SAVE_ONE_SUCCESS,
  THESIS_SAVE_ONE_FAILURE,
  THESIS_UPDATE_ONE_SUCCESS,
  THESIS_UPDATE_ONE_FAILURE,
} from "./thesis.actions";

/*
*Defines what the intial state is when no changes have yet been done to the state.
*/
const INITIAL_STATE = fromJS({
  theses: [],
  fetchingFromAPI: false,
});

/*
* The function that handles the different state changes depending on which case
* has been passed to it from thesis.actions.
* @param state The state, which is INITIAL_STATE by default, but is modified in accordance
* to all the changes thus far.
* @param action One of the previously defined actions from thesis.actions that defines
* which case is relevant.
* @return The new state created by the modification of the previous one.
*/
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case THESIS_GET_ALL_REQUEST:
      return state.mergeIn(["fetchingFromAPI"], true);
    case THESIS_GET_ALL_SUCCESS:
      return state.merge(fromJS({
        theses: action.payload,
        fetchingFromAPI: false,
      }));
      // return state.updateIn(["theses"], list => list.concat(fromJS(action.payload)));
    case THESIS_GET_ALL_FAILURE:
    // probably should display error message?
      return state;
    case THESIS_SAVE_ONE_SUCCESS:
      return state.updateIn(["theses"], list => list.push(new Map(action.payload)));
    case THESIS_SAVE_ONE_FAILURE:
    // probably should display error message?
      return state;
    case THESIS_UPDATE_ONE_SUCCESS:
      return state.updateIn(["theses"], list => list.push(new Map(action.payload)));
    case THESIS_UPDATE_ONE_FAILURE:
    // probably should display error message?
    default:
      return state;
  }
}
