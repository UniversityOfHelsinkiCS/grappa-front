/**
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
export const USER_SAVE_ONE_SUCCESS = "USER_SAVE_ONE_SUCCESS";
export const USER_SAVE_ONE_FAILURE = "USER_SAVE_ONE_FAILURE";


export const getUsers = () => (
  {
    type: CALL_API,
    success: USER_GET_ALL_SUCCESS,
    failure: USER_GET_ALL_FAILURE,
    method: "get",
    url: "/user",
    data: {},
  }
);

/**
 * The action called to save the given data as a new user in the database.
 * @param user An object cantaining all the relevant data of the new user thats
 * to be added.
 * @return registerUser The object containing the relevant information for the
 * reducer to handle the data accordingly.
 */
export const registerUser = (user) => (
  {
    type: CALL_API,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for your account to be created.",
    },
    success: USER_SAVE_ONE_SUCCESS,
    successMessage: {
      type: "success",
      title: "Success",
      body: "You've succesfully registered. You can log in once the admin has activated your account.",
    },
    failure: USER_SAVE_ONE_FAILURE,
    method: "post",
    url: "/user",
    data: user,
  }
);

/**
 * Action-creator for sending PUT-request to API
 *
 * @param {Object} user - User to be updated
 * @return {Object} - Action for API to handle
 */
export const updateUser = (user) => {
  console.log("updateUser-action called!");
  return {
    type: CALL_API,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for User to be updated.",
    },
    success: USER_UPDATE_ONE_SUCCESS,
    successMessage: {
      type: "success",
      title: "Success",
      body: "User was updated.",
    },
    failure: USER_UPDATE_ONE_FAILURE,
    method: "put",
    url: `/user/${user.id}`,
    data: user,
  };
};

/**
 * Action-creator for deleting an user
 *
 * @param {Object} user - User to delete, needs to put into data-field for the reducer
 * @return {Object} - Action for API to handle
 */
export const deleteUser = (user) => {
  console.log("deleteUser-action called!");
  return {
    type: CALL_API,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for User to be deleted.",
    },
    success: USER_DELETE_ONE_SUCCESS,
    successMessage: {
      type: "warning",
      title: "Success",
      body: "User was deleted.",
    },
    failure: USER_DELETE_ONE_FAILURE,
    failureMessage: {
      type: "error",
      title: "Error",
      body: "Deletion of the user failed.",
    },
    method: "delete",
    url: `/user/${user.id}`,
    data: user,
  };
};
