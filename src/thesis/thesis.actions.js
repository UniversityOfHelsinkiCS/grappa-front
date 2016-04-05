import { CALL_API } from "../middleware/grappaAPI";

export const THESIS_GET_ALL_SUCCESS = "THESIS_GET_ALL_SUCCESS";
export const THESIS_GET_ALL_FAILURE = "THESIS_GET_ALL_FAILURE";

export const THESIS_RESET_ALL_REQUEST = "THESIS_RESET_ALL_REQUEST";

// export const THESIS_SAVE_ONE_REQUEST = "THESIS_SAVE_ONE_REQUEST";
export const THESIS_SAVE_ONE_SUCCESS = "THESIS_SAVE_ONE_SUCCESS";
export const THESIS_SAVE_ONE_FAILURE = "THESIS_SAVE_ONE_FAILURE";

export const getTheses = () => {
  console.log("getTheses-action called!");
  return {
    type: CALL_API,
    success: THESIS_GET_ALL_SUCCESS,
    failure: THESIS_GET_ALL_FAILURE,
    method: "get",
    url: "/thesis",
    data: {},
  };
};

export const resetTheses = () => {
  console.log("resetTheses-action called!");
  return {
    type: THESIS_RESET_ALL_REQUEST,
  };
};

export const saveThesis = (thesis) => {
  console.log("saveThesis-action called!");
  return {
    type: CALL_API,
    success: THESIS_SAVE_ONE_SUCCESS,
    failure: THESIS_SAVE_ONE_FAILURE,
    method: "post",
    url: "/thesis",
    data: thesis,
  };
};
