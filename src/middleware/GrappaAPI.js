import axios from "axios";

import {
  // THESIS_GET_ALL_REQUEST,
  THESIS_GET_ALL_SUCCESS,
  THESIS_GET_ALL_FAILURE,
  // THESIS_RESET_ALL_REQUEST,
  // THESIS_SAVE_ONE_REQUEST,
  // THESIS_SAVE_ONE_SUCCESS,
  // THESIS_SAVE_ONE_FAILURE,
} from "../thesis/Thesis.actions";

export const CALL_API = "CALL_API";
export const API_PATH = "http://tktl-grappa.herokuapp.com";

export const handleCallApi = store => next => action => {
  next(action);
  if (action.type === CALL_API) {
    console.log("handling CALL_API inside api!");
    axios({
      method: action.method,
      url: API_PATH + action.url,
      data: action.data,
    })
    .then(function(res) {
      console.log("yo gettasin datan testiapista:", res);
      store.dispatch({
        type: THESIS_GET_ALL_SUCCESS,
        payload: res.data.result,
      })
    })
    .catch(function(err) {
      console.log("vituix meni request " + err)
      store.dispatch({
        type: THESIS_GET_ALL_FAILURE,
        message: "Get theses produced an error.",
        error: err,
      })
    })
  }
}