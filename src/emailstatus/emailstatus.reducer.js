import { fromJS } from "immutable";
import {
  EMAILSTATUS_GET_ALL_SUCCESS,
  EMAILSTATUS_GET_ALL_FAILURE,
} from "./emailstatus.actions";

const INITIAL_STATE = fromJS({
  emailstatuses: [],
});

/**
 * The default function for handling the state change
 *
 * USER_GET_ALL_SUCCESS: current users are merged with those fetched from API.
 * @param {Object} state - Current state of the reducer
 * @param {Object} action - Action dispatched from Smart-component or GrappaAPI
 * @return {Object} state - State to replace the current state
 */
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case EMAILSTATUS_GET_ALL_SUCCESS:
      return state.merge(fromJS({
        emailstatuses: action.payload,
      }));
    case EMAILSTATUS_GET_ALL_FAILURE:
    // probably should display error message?
      return state;
    default:
      return state;
  }
}
