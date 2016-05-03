import { fromJS } from "immutable";
import {
  CREATE_FLASH_MESSAGE,
  DELETE_FLASH_MESSAGE,
} from "./flash.actions";

const INITIAL_STATE = fromJS({
  messages: [{
    id: -1,
    type: "info",
    title: "Apua",
    body: "Rikoit kaiken",
  },
  {
    id: -2,
    type: "success",
    title: "Apua",
    body: "Rikoit kaiken",
  }],
  nextId: 0,
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_FLASH_MESSAGE:
      console.log("create tuli :D")
      const newMessage = Object.assign(
        { id: state.get("nextId") },
        action.message
      );
      const newMessages = [...state.get("messages").slice(-3), newMessage];
      console.log(newMessage)
      return state.merge({
        messages: fromJS(newMessages),
        nextId: state.get("nextId") + 1,
      });
    case DELETE_FLASH_MESSAGE:
      console.log("tuli delete :0")
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
