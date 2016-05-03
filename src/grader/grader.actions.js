import { CALL_API } from "../middleware/grappaAPI";

export const GRADER_UPDATE_SUCCESS = "GRADER_UPDATE_SUCCESS";
export const GRADER_UPDATE_FAILURE = "GRADER_UPDATE_FAILURE";

export const updateGrader = (data) => {
  console.log("updateGrader-action called!");
  return {
    type: CALL_API,
    success: GRADER_UPDATE_SUCCESS,
    failure: GRADER_UPDATE_FAILURE,
    method: "put",
    url: `/grader/${data.id}`,
    data,
  };
};
