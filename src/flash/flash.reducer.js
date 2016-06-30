import { fromJS } from "immutable";
import {
  CREATE_FLASH_MESSAGE,
  DELETE_FLASH_MESSAGE,
} from "./flash.actions";

const INITIAL_STATE = fromJS({
  messages: [],
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_FLASH_MESSAGE:
      const newMessages = [...state.get("messages").slice(-3), fromJS({
        id: action.id,
        type: action.message.type,
        title: action.message.title,
        body: action.message.body,
      })];
      return state.merge({
        messages: newMessages,
      });
    case DELETE_FLASH_MESSAGE:
      return state.updateIn(["messages"], messages =>
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
