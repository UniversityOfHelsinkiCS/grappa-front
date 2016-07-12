import { CALL_API } from "../middleware/grappaAPI";

export const GRADER_GET_ALL_SUCCESS = "GRADER_GET_ALL_SUCCESS";
export const GRADER_GET_ALL_FAILURE = "GRADER_GET_ALL_FAILURE";

export const GRADER_SAVE_ONE_SUCCESS = "GRADER_SAVE_ONE_SUCCESS";
export const GRADER_SAVE_ONE_FAILURE = "GRADER_SAVE_ONE_FAILURE";

export const GRADER_UPDATE_ONE_SUCCESS = "GRADER_UPDATE_ONE_SUCCESS";
export const GRADER_UPDATE_ONE_FAILURE = "GRADER_UPDATE_ONE_FAILURE";

export const getGraders = () => (
  {
    type: CALL_API,
    success: GRADER_GET_ALL_SUCCESS,
    failure: GRADER_GET_ALL_FAILURE,
    method: "get",
    url: "/grader",
    data: {},
  }
);

export const saveGrader = (data) => (
  {
    type: CALL_API,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for Grader to be saved.",
    },
    success: GRADER_SAVE_ONE_SUCCESS,
    successMessage: {
      type: "success",
      title: "Success",
      body: "Grader was saved.",
    },
    failure: GRADER_SAVE_ONE_FAILURE,
    method: "post",
    url: "/grader",
    data,
  }
);

export const updateGrader = (data) => (
  {
    type: CALL_API,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for Grader to be updated.",
    },
    success: GRADER_UPDATE_ONE_SUCCESS,
    successMessage: {
      type: "success",
      title: "Success",
      body: "Grader was updated.",
    },
    failure: GRADER_UPDATE_ONE_FAILURE,
    method: "put",
    url: `/grader/${data.id}`,
    data,
  }
);
