import { CALL_API } from "../middleware/grappaAPI";

export const USERS_GET_ALL_SUCCESS = "USERS_GET_ALL_SUCCESS";
export const USERS_GET_ALL_FAILURE = "USERS_GET_ALL_FAILURE";

export const getUsers = () => {
  console.log("getUsers-action called!");
  return {
    type: CALL_API,
    success: USERS_GET_ALL_SUCCESS,
    failure: USERS_GET_ALL_FAILURE,
    method: "get",
    url: "/user",
    data: {},
  };
};