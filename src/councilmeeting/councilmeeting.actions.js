/*
* The file containing all the defined actions that one can call to gain access
* to modifying the state in regard to adding or getting councilmeetings.
*/

import { CALL_API } from "../middleware/grappaAPI";

export const COUNCILMEETING_GET_ALL_SUCCESS = "COUNCILMEETING_GET_ALL_SUCCESS";
export const COUNCILMEETING_GET_ALL_FAILURE = "COUNCILMEETING_GET_ALL_FAILURE";
export const COUNCILMEETING_SAVE_ONE_SUCCESS = "COUNCILMEETING_SAVE_ONE_SUCCESS";
export const COUNCILMEETING_SAVE_ONE_FAILURE = "CONCILMEETING_SAVE_ONE_FAILURE";

/*
* The action called to add a councilmeeting to the database.
* @param Councilmeeting A object containing all the relevant information to create
* a new councilmeeting entry.
* @return Councilmeeting The object containing the relevant information for the
* reducer to handle the data accordingly.
*/
export const addCouncilmeeting = (Councilmeeting) => {
  console.log("addCouncilmeeting-action called :)");
  return {
    type: CALL_API,
    success: COUNCILMEETING_SAVE_ONE_SUCCESS,
    successMessage: {
      type: "success",
      title: "Success",
      body: "Councilmeeting was saved.",
    },
    failure: COUNCILMEETING_SAVE_ONE_FAILURE,
    method: "post",
    url: "/councilmeeting",
    data: Councilmeeting,
  };
};
/*
* The action called get the data concerning all the councilmeetings from the database.
* @param FilterParams An object containing the filter for which dates to return.
* @return getCouncilmeetings The object containing the relevant information for the
* reducer to handle the data accordingly.
*/
export const getCouncilmeetings = (filterParams) => {
  console.log("getCouncilmeetings-action called :)");
  return {
    type: CALL_API,
    success: COUNCILMEETING_GET_ALL_SUCCESS,
    failure: COUNCILMEETING_GET_ALL_FAILURE,
    method: "get",
    url: "/councilmeeting",
    data: filterParams,
  };
};
