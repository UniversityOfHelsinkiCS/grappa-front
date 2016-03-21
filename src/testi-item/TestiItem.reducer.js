import { fromJS } from "immutable";

import {
  TESTIITEM_GET_ALL_REQUEST,
  // TESTIITEM_GET_ALL_SUCCESS,
  // TESTIITEM_GET_ALL_FAILURE,
  TESTIITEM_SAVE_ONE_REQUEST,
  // TESTIITEM_SAVE_ONE_SUCCESS,
  // TESTIITEM_SAVE_ONE_FAILURE,
} from "./TestiItem.actions";

const INITIAL_STATE = fromJS({
  listani: [
    { id: 1, name: "eka", status: "unsaved" },
    { id: 2, name: "toka", status: "unsaved" },
  ],
});

// return state.merge({
//   listani: [
//     state.get("listani"),
//     { id: 3, name: "kolmas", status: "unsaved"},
//   ]
// });

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case TESTIITEM_GET_ALL_REQUEST:
      return state.merge({
        listani: [
          { id: 0, name: "nolla", status: "unsaved" },
        ],
      });
    case TESTIITEM_SAVE_ONE_REQUEST:
      return state.merge({
        listani: state.get("listani").push(
          action.body
        ),
      });
    default:
      return state;
  }
}
