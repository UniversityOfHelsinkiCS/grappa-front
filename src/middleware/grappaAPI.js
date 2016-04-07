import axios from "axios";

export const CALL_API = "CALL_API";
export const API_PATH = "http://localhost:9876";

export const handleCallApi = store => next => action => {
  next(action);
  if (action.type === CALL_API) {
    axios({
      method: action.method,
      url: API_PATH + action.url,
      data: action.data,
    })
    .then(res => {
      store.dispatch({
        type: action.success,
        payload: res.data,
      });
    })
    .catch(err => {
      store.dispatch({
        type: action.failure,
        message: "Calling GrappaAPI produced an error.",
        error: err,
      });
    });
  }
};
