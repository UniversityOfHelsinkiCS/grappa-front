import {createStore} from "redux";
import test_reducer from "./reducers/test.reducer";

export default function makeStore() {
  return createStore(test_reducer);
}