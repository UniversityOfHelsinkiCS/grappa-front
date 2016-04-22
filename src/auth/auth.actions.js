import { CALL_API } from "../middleware/grappaAPI";

export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";
export const LOGOUT_USER = "LOGOUT_USER";

export const loginUser = (userData) => {
  console.log("loginUser-action called!");
  return {
    type: CALL_API,
    success: LOGIN_USER_SUCCESS,
    failure: LOGIN_USER_FAILURE,
    method: "post",
    url: "/login",
    data: userData,
  };
};

export const logout = () => {
  console.log("logout called!");
  return {
    type: LOGOUT_USER,
  };
};
