import { fromJS } from "immutable";

import {
   COUNCILMEETING_GET_ALL_SUCCESS,
  // COUNCILMEETING_GET_ALL_FAILURE,

  COUNCILMEETING_SAVE_ONE_SUCCESS,
  // COUNCILMEETING_SAVE_ONE_FAILURE,

} from "./councilmeeting.actions";

const INITIAL_STATE = fromJS({
  councilmeetinglist: [
    {
      id: 1,
      date: "date1",
    },
    {
      id: 2,
      date: "date2",
    },
    {
      id: 3,
      date: "date3",
    },
  ],
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case COUNCILMEETING_SAVE_ONE_SUCCESS:
      return state.updateIn(["councilmeetinglist"], list => list.concat(fromJS(action.payload)));
    case COUNCILMEETING_GET_ALL_SUCCESS:
      return state.mergeIn(["councilmeetinglist"], fromJS(action.payload));
    default:
      return state;
  }
}
