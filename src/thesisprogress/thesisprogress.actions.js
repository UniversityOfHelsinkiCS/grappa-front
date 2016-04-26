import { CALL_API } from "../middleware/grappaAPI";

export const THESISPROGRESS_GET_ALL_SUCCESS = "THESISPROGRESS_GET_ALL_SUCCESS";
export const THESISPROGRESS_GET_ALL_FAILURE = "THESISPROGRESS_GET_ALL_FAILURE";
// export const THESISPROGRESS_GET_ONE_SUCCESS = "THESISPROGRESS_GET_ONE_SUCCESS";
// export const THESISPROGRESS_GET_ONE_FAILURE = "THESISPROGRESS_GET_ONE_FAILURE";

export const getThesisProgress = () => {
  console.log("getThesesProgress-action called!");
  return {
    type: CALL_API,
    success: THESISPROGRESS_GET_ALL_SUCCESS,
    failure: THESISPROGRESS_GET_ALL_FAILURE,
    method: "get",
    url: "/thesisprogress",
    data: {},
  };
};

// export const getOneThesisProgress = (id) => {
//   console.log("getOneThesisProgress-action called!");
//   console.log(id);
//   return {
//     type: CALL_API,
//     success: THESISPROGRESS_GET_ONE_SUCCESS,
//     failure: THESISPROGRESS_GET_ONE_FAILURE,
//     method: "get",
//     url: "/thesisprogress/" + id,
//     data: {id},
//   }
// }
