/*
* The file containing all the defined actions that one can call to gain access
* to modifying the state in regard to adding or getting councilmeetings.
*/

import { CALL_API } from "../middleware/grappaAPI";

export const PDF_GET_SUCCESS = "PDF_GET_SUCCESS";
export const PDF_GET_FAILURE = "PDF_GET_FAILURE";

/*
* The action called get the data concerning all the councilmeetings from the database.
* @param FilterParams An object containing the filter for which dates to return.
* @return getCouncilmeetings The object containing the relevant information for the
* reducer to handle the data accordingly.
*/

export const createPdfs = (theses) => {
  console.log("createPdfs-action called!");
  return {
    type: CALL_API,
    success: "PDF_GET_SUCCESS",
    failure: "PDF_GET_FAILURE",
    method: "post",
    url: "/thesis/pdf",
    data: theses,
  };
};
