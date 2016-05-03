import { createMessage } from "../flash/flash.actions";

export const manageState = store => next => action => {
  next(action);
  if (action.flashMessage !== undefined) {
    console.log("action tuli!")
    console.log(action);
    store.dispatch(createMessage(action.flashMessage));
  }
}
