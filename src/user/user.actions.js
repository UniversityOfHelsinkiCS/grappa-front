/*
* The file containing all the defined actions that one can call to gain access
* to modifying the state in regard to listing, accept and decline users.
*/
import { CALL_API } from "../middleware/grappaAPI";

export const USER_GET_ALL_SUCCESS = "USER_GET_ALL_SUCCESS";
export const USER_GET_ALL_FAILURE = "USER_GET_ALL_FAILURE";
export const USER_UPDATE_ONE_SUCCESS = "USER_UPDATE_ONE_SUCCESS";
export const USER_UPDATE_ONE_FAILURE = "USER_UPDATE_ONE_FAILURE";
export const USER_DELETE_ONE_SUCCESS = "USER_DELETE_ONE_SUCCESS";
export const USER_DELETE_ONE_FAILURE = "USER_DELETE_ONE_FAILURE";

/*
* The action called to get a list of all new users in the database.
* @return getUsers The object containing the relevant information for the
* reducer to handle the data accordingly.
*/
export const getUsers = () => {
  console.log("getUsers-action called!");
  return {
    type: CALL_API,
    success: USER_GET_ALL_SUCCESS,
    failure: USER_GET_ALL_FAILURE,
    method: "get",
    url: "/user",
    data: {},
  };
};

export const updateUser = (user) => {
  console.log("updateUser-action called!");
  return {
    type: CALL_API,
    success: USER_UPDATE_ONE_SUCCESS,
    failure: USER_UPDATE_ONE_FAILURE,
    method: "put",
    url: `/user/${user.id}`,
    data: user,
  };
};

export const deleteUser = (user) => {
  console.log("deleteUser-action called!");
  return {
    type: CALL_API,
    success: USER_DELETE_ONE_SUCCESS,
    failure: USER_DELETE_ONE_FAILURE,
    method: "delete",
    url: `/user/${user.id}`,
    data: user,
  };
};
