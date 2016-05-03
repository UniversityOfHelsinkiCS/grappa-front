/*
* The file containing all the defined actions that one can call to gain access
* to modifying the state in regard to listing, accept and decline Emailstatuses.
*/
import { CALL_API } from "../middleware/grappaAPI";

export const EMAILSTATUS_GET_ALL_SUCCESS = "EMAILSTATUS_GET_ALL_SUCCESS";
export const EMAILSTATUS_GET_ALL_FAILURE = "EMAILSTATUS_GET_ALL_FAILURE";

/*
* The action called to get a list of all emailstatuses in the database.
* @return getEmailstatuses The object containing the relevant information for the
* reducer to handle the data accordingly.
*/
export const getEmailstatuses = () => {
  console.log("getEmailstatuses-action called!");
  return {
    type: CALL_API,
    success: EMAILSTATUS_GET_ALL_SUCCESS,
    failure: EMAILSTATUS_GET_ALL_FAILURE,
    method: "get",
    url: "/emailstatus",
    data: {},
  };
};
