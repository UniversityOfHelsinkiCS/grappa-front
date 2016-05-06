import { CALL_API } from "../middleware/grappaAPI";

export const THESISPROGRESS_GET_ALL_SUCCESS = "THESISPROGRESS_GET_ALL_SUCCESS";
export const THESISPROGRESS_GET_ALL_FAILURE = "THESISPROGRESS_GET_ALL_FAILURE";
export const THESISPROGRESS_UPDATE_ONE_SUCCESS = "THESISPROGRESS_UPDATE_ONE_SUCCESS";
export const THESISPROGRESS_UPDATE_ONE_FAILURE = "THESISPROGRESS_UPDATE_ONE_FAILURE";
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

/**
 * The action used to change some values in a thesis.
 *
 * @param data object containing the fields we want to change
 * @return The object containing the relevant information for the
 * reducer to handle the data accordingly.
 */
export const updateThesisProgress = (data) => {
  console.log("updateThesis-action called!");
  return {
    type: CALL_API,
    success: THESISPROGRESS_UPDATE_ONE_SUCCESS,
    failure: THESISPROGRESS_UPDATE_ONE_FAILURE,
    method: "put",
    url: "/thesisprogress",
    data,
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
