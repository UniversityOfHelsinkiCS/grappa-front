import axios from "axios";

import {
  // THESIS_GET_ALL_REQUEST,
  THESIS_GET_ALL_SUCCESS,
  THESIS_GET_ALL_FAILURE,
  // THESIS_RESET_ALL_REQUEST,
  // THESIS_SAVE_ONE_REQUEST,
  // THESIS_SAVE_ONE_SUCCESS,
  // THESIS_SAVE_ONE_FAILURE,
} from "../thesis/thesis.actions";

export const CALL_API = "CALL_API";
export const API_PATH = "http://tktl-grappa.herokuapp.com";

export const handleCallApi = store => next => action => {
  next(action);
  if (action.type === CALL_API) {
    axios({
      method: action.method,
      url: API_PATH + action.url,
      data: action.data,
    })
    .then(function(res) {
      store.dispatch({
        type: action.success,
        payload: res.data.result,
      })
    })
    .catch(function(err) {
      store.dispatch({
        type: action.failure,
        message: "Calling GrappaAPI produced an error.",
        error: err,
      })
    })
  }
}
