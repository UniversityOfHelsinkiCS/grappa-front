import { CALL_API } from "../middleware/grappaAPI";

export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";
export const LOGOUT_USER = "LOGOUT_USER";

/**
 * Action-creator for sending the login request to API
 *
 * @param {Object} UserData - User login information
 * @return {Object} - Action for API to handle
 */
export const loginUser = (userData) => (
  {
    type: CALL_API,
    success: LOGIN_USER_SUCCESS,
    failure: LOGIN_USER_FAILURE,
    method: "post",
    url: "/login",
    data: userData,
  }
);

/**
 * Action-creator for resetting the user-state
 *
 * @return {Object} - Logout-action
 */
export const logout = () => (
  {
    type: LOGOUT_USER,
  }
);
