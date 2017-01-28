import axios from "axios";
import { logout } from "auth/auth.actions";

export const createRequest = (action, store) => {

  store.dispatch({
    type: action.type + "_REQUEST",
  });

  const token = store.getState().get("auth").get("token");
  const request = action.payload.request;

  return axios({
    method: request.method,
    url: process.env.API_URL + request.url,
    data: request.data,
    headers: {
      "X-Access-Token": token,
    },
    responseType: request.responseType === undefined ? "json" : request.responseType,
  })
  .then(res => {
    console.log(res)
    const newAction = {
      type: action.type + "_SUCCESS",
      // if server doesn't return anything e.g. in PUT or DELETE, use request.data as payload
      payload: res.data || request.data,
      flashMessage: action.successMessage,
    }
    // incase response contained some informative message e.g. thesis/ethesis/:token
    // show that instead of default body
    if (res.data && res.data.message) {
      newAction.flashMessage.body = res.data.message;
    }
    store.dispatch(newAction);
    return newAction;
  })
  // change this shit x_x
  // https://twitter.com/dan_abramov/status/770914221638942720?lang=fi
  .catch(err => {
    let data;
    if (request.responseType === "arraybuffer") {
      const arr = new Uint8Array(err.response.data);
      const str = String.fromCharCode.apply(String, arr);
      data = JSON.parse(str);
    } else {
      data = err.response.data;
    }
    const newAction = {
      type: action.type + "_FAILURE",
      error: err,
      flashMessage: {
        type: "error",
        title: "Error",
        body: data.message,
      }
    }
    // custom status code for handling expired login
    // has to be dispatched before error since logout will reset the flash messages too
    if (err.response.status === 440) {
      store.dispatch(logout())
    }
    store.dispatch(newAction);
    return newAction;
  });
};

export const handleRequest = store => next => action => {
  next(action);
  if (action.payload && action.payload.request) {
    return createRequest(action, store);
  }
};
