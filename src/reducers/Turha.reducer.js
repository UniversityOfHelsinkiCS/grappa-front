import { fromJS } from "immutable";

import {
  TURHA_REQUEST,
  TURHA_SUCCESS,
} from "../actions/Turha.actions";

const INITIAL_STATE =  fromJS({
  turhalista: [1, 2, 3],
  turhaseuraava: 4,
  turhastatus: "init",
});

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case TURHA_REQUEST:
      return state.merge({
        turhaseuraava: state.get('turhaseuraava')+1,
        turhalista: [
          state.get('turhaseuraava')+1,
        ],
        turhastatus: "request",
      });
    case TURHA_SUCCESS:
      return state.merge({
        turhastatus: "success",
      });
    default:
     return state;
  }
}
