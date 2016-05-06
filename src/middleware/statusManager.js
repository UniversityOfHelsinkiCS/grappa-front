import { createMessage } from "../flash/flash.actions";

export const manageState = store => next => action => {
  next(action);
  if (action.flashMessage !== undefined && action.flashMessage !== null) {
    console.log("flashMessage tuli!");
    console.log(action);
    store.dispatch(createMessage(action.flashMessage));
  }
  if (action.redirect !== undefined && action.redirect !== null) {
    console.log("redirect tuli!");
  }
};
