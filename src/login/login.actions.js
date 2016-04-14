import { CALL_API } from "../middleware/grappaAPI";

export const LOGIN_SAVE_ONE_SUCCESS = "LOGIN_SAVE_ONE_SUCCESS";
export const LOGIN_SAVE_ONE_FAILURE = "LOGIN_SAVE_ONE_FAILURE";


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
