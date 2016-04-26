/*
* The file containing all the defined actions that one can call to gain access
* to modifying the state in regard to listing, accept and decline users.
*/
import { CALL_API } from "../middleware/grappaAPI";

export const USERS_GET_ALL_SUCCESS = "USERS_GET_ALL_SUCCESS";
export const USERS_GET_ALL_FAILURE = "USERS_GET_ALL_FAILURE";
export const USER_UPDATE_ONE_LOCAL = "USERS_GET_ALL_FAILURE";
export const USER_UPDATE_ONE_SUCCESS = "USER_UPDATE_ONE_SUCCESS";
export const USER_UPDATE_ONE_FAILURE = "USER_UPDATE_ONE_FAILURE";
export const USER_DECLINE_SUCCESS = "USER_DECLINE_SUCCESS";
export const USER_DECLINE_FAILURE = "USER_DECLINE_FAILURE";

/*
* The action called to get a list of all new users in the database.
* @return getUsers The object containing the relevant information for the
* reducer to handle the data accordingly.
*/
export const getUsers = () => {
  console.log("getUsers-action called!");
  return {
    type: CALL_API,
    success: USERS_GET_ALL_SUCCESS,
    failure: USERS_GET_ALL_FAILURE,
    method: "get",
    url: "/user/new",
    data: {},
  };
};

export const updateUserLocally = (user) => {
  console.log("updateUser-action called!");
  return {
    type: USER_UPDATE_ONE_LOCAL,
    data: user,
  };
};

export const updateUser = (user) => {
  console.log("updateUser-action called!");
  return {
    type: CALL_API,
    success: USER_UPDATE_ONE_SUCCESS,
    failure: USER_UPDATE_ONE_FAILURE,
    method: "put",
    url: "/user/",
    data: user,
  };
};

export const declineUser = (user) => {
  console.log("declineUser-action called!");
  return {
    type: CALL_API,
    success: USER_DECLINE_SUCCESS,
    failure: USER_DECLINE_FAILURE,
    method: "delete",
    url: "/user/",
    data: user,
  };
};
