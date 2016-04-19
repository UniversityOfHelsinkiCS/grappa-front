import { CALL_API } from "../middleware/grappaAPI";

export const THESISPROGRESS_GET_ALL_SUCCESS = "THESISPROGRESS_GET_ALL_SUCCESS";
export const THESISPROGRESS_GET_ALL_FAILURE = "THESISPROGRESS_GET_ALL_FAILURE";

export const getThesisProgress = (thesisid) => {
  console.log("getThesesProgress-action called!");
  return {
    type: CALL_API,
    success: THESISPROGRESS_GET_ALL_SUCCESS,
    failure: THESISPROGRESS_GET_ALL_FAILURE,
    method: "get",
    url: "/thesisprogress",
    data: thesisid,
  };
};
