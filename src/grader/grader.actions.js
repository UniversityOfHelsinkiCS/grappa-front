import { CALL_API } from "../middleware/grappaAPI";

export const GRADER_UPDATE_MANY_SUCCESS = "GRADER_UPDATE_MANY_SUCCESS";
export const GRADER_UPDATE_MANY_FAILURE = "GRADER_UPDATE_MANY_FAILURE";

export const updateGraders = (data) => {
  console.log("updateGrader-action called!");
  return {
    type: CALL_API,
    success: GRADER_UPDATE_MANY_SUCCESS,
    failure: GRADER_UPDATE_MANY_FAILURE,
    method: "post",
    url: "/grader/many",
    data,
  };
};
