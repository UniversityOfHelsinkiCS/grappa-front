import { fromJS } from "immutable";

const INITIAL_STATE = fromJS({
  users: [],
});

/**
 * The default function for handling the state change
 *
 * USER_GET_ALL_SUCCESS: current users are merged with those fetched from API.
 * USER_UPDATE_ONE_SUCCESS: succesfully updated user is now also updated inside
 * this reducer.
 * USER_DELETE_ONE_SUCCESS: if the sent request to delete user is success then the current
 * users are looped through and the user to be deleted is excluded from the new users-list.
 * Which is essentially the same as deleting the user but without ever explictly calling 'delete'.
 * @param {Object} state - Current state of the reducer
 * @param {Object} action - Action dispatched from Smart-component or GrappaAPI
 * @return {Object} state - State to replace the current state
 */
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "USER_SAVE_ONE_SUCCESS":
      return state;
    case "USER_SAVE_ONE_FAILURE":
      return state;
    case "USER_GET_ALL_SUCCESS":
      return state.mergeIn(["users"], fromJS(action.payload));
    case "USER_GET_ALL_FAILURE":
      return state;
    case "USER_UPDATE_ONE_SUCCESS":
      return state.updateIn(["users"], users =>
        users.map(user => {
          console.log(user)
          if (user.get("id") === action.payload.id) {
            return fromJS(action.payload);
          }
          return user;
        })
      );
    case "USER_UPDATE_ONE_FAILURE":
      return state;
    case "USER_DELETE_ONE_SUCCESS":
      return state.updateIn(["users"], list =>
        list.filter(user => {
          if (user.get("id") !== action.payload.id) {
            return user;
          }
        })
      );
    case "USER_DELETE_ONE_FAILURE":
      return state;
    default:
      return state;
  }
}
