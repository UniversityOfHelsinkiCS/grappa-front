import axios from "axios";

export const CALL_API = "CALL_API";
export const API_PATH = process.env.API_URL;

/**
 * Method for intercepting CALL_API-type actions before reducers
 *
 * This method is being called on every dispatched action and it
 * checks them for CALL_API -type. Currently it doesn't consume
 * the action so it always calls next(action) which lets the action
 * be passed forward to the reducers. Incase the type is CALL_API
 * this method triggers asynchronous call to the API which once finished
 * dispatches either SUCCESS or FAILURE type of action.
 */
export const handleCallApi = store => next => action => {
  if (action.type === CALL_API) {
    const user = store.getState().get("auth").get("user").toJS();
    const token = store.getState().get("auth").get("token");
    // console.log(user);
    axios({
      method: action.method,
      url: API_PATH + action.url,
      data: action.data,
      headers: {
        "X-Access-Token": token,
        "X-Key": user.id,
      },
    })
    .then(res => {
      if (action.method === "get") {
        store.dispatch({
          type: action.success,
          payload: res.data,
          sent: action.data,
        });
      } else {
        store.dispatch({
          type: action.success,
          payload: res.data,
          sent: action.data,
          flashMessage: {
            type: "success",
            title: "titteli",
            body: "onnistui",
          },
        });
      }
    })
    .catch(err => {
      store.dispatch({
        type: action.failure,
        message: "Calling GrappaAPI produced an error.",
        error: err,
      });
    });
  } else {
    next(action);
  }
};
