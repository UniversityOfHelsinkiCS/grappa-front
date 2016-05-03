import { fromJS } from "immutable";
import {
  SEND_NOTIFICATION_SUCCESS,
  SEND_NOTIFICATION_FAILURE,
} from "./email.actions";

/*
*Defines what the intial state is when no changes have yet been done to the state.
*/
const INITIAL_STATE = fromJS({
  notificationSent: "not_sent",
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEND_NOTIFICATION_SUCCESS:
      return state.updateIn(["notificationSent"], () => "sent");
    case SEND_NOTIFICATION_FAILURE:
      return state;
    default:
      console.log("returning default state");
      return state;
  }
}
