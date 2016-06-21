import { fromJS } from "immutable";
import {
  UPLOAD_REQUEST,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
} from "./upload.actions";

const INITIAL_STATE = fromJS({
  status: "",
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPLOAD_REQUEST:
      return state.merge({
        status: "uploading",
      });
    case UPLOAD_SUCCESS:
      return state.merge({
        status: "",
      });
    case UPLOAD_FAILURE:
      return state.merge({
        status: "",
      });
    default:
      return state;
  }
}
