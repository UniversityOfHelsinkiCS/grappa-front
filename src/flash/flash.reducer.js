import { fromJS } from "immutable";
import {
  CREATE_FLASH_MESSAGE,
  HIDE_FLASH_MESSAGE,
} from "./flash.actions";

const INITIAL_STATE = fromJS({
  showableMessages: [],
  messages: [],
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_FLASH_MESSAGE:
      const newMessage = fromJS({
        id: action.id,
        type: action.message.type,
        title: action.message.title,
        body: action.message.body,
      });
      return state.merge({
        showableMessages: [...state.get("showableMessages"), newMessage],
        messages: [...state.get("messages"), newMessage],
      });
    case HIDE_FLASH_MESSAGE:
      return state.updateIn(["showableMessages"], messages =>
        messages.filter(msg => {
          if (msg.get("id") !== action.id) {
            return msg;
          }
        })
      );
    default:
      return state;
  }
}
