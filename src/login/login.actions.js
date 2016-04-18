import { CALL_API } from "../middleware/grappaAPI";

export const LOGIN_SAVE_ONE_SUCCESS = "LOGIN_SAVE_ONE_SUCCESS";
export const LOGIN_SAVE_ONE_FAILURE = "LOGIN_SAVE_ONE_FAILURE";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const saveLoginData = (loginData) => {
  console.log("saveLoginData-action called!");
  return {
    type: CALL_API,
    success: LOGIN_SAVE_ONE_SUCCESS,
    failure: LOGIN_SAVE_ONE_FAILURE,
    method: "post",
    url: "/login",
    data: loginData,
  };
};

export const logout = () => {
  console.log("Logout called!");
  return {
    type: CALL_API,
    success: LOGOUT_SUCCESS,
    failure: LOGOUT_FAILURE,
    method: "post",
    url: "/login",
    data: {},
  };
};
