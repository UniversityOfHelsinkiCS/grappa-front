import { createMessage, deleteMessage } from "../flash/flash.actions";
import {
  CREATE_FLASH_MESSAGE,
} from "../flash/flash.actions";

let nextId = 0;

export const manageState = store => next => action => {
  next(action);
  if (action.flashMessage !== undefined && action.flashMessage !== null) {
    store.dispatch(createMessage(action.flashMessage, nextId++));
  }
  if (action.type === CREATE_FLASH_MESSAGE) {
    setTimeout(() => {
      store.dispatch(deleteMessage(action.id));
    }, 15000);
  }
  if (action.redirect !== undefined && action.redirect !== null) {
    console.log("redirect tuli!");
  }
};
