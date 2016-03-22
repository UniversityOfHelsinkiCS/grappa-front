import { CALL_API } from "../middleware/GrappaAPI";

export const THESIS_GET_ALL_SUCCESS = "THESIS_GET_ALL_SUCCESS";
export const THESIS_GET_ALL_FAILURE = "THESIS_GET_ALL_FAILURE";

export const THESIS_RESET_ALL_REQUEST = "THESIS_RESET_ALL_REQUEST";

export const THESIS_SAVE_ONE_REQUEST = "THESIS_SAVE_ONE_REQUEST";
// export const THESIS_SAVE_ONE_SUCCESS = "THESIS_SAVE_ONE_SUCCESS";
// export const THESIS_SAVE_ONE_FAILURE = "THESIS_SAVE_ONE_FAILURE";

export const getTheses = () => {
  console.log("getTheses-action called!");
  return {
    type: CALL_API,
    method: "get",
    url: "/theses",
    data: {},
  };
};

export const resetTheses = () => {
  console.log("resetTheses-action called!");
  return {
    type: THESIS_RESET_ALL_REQUEST,
  };
};

export const addThesis = (Thesis) => {
  console.log("addThesis-action called!");
  return {
    type: THESIS_SAVE_ONE_REQUEST,
    body: Thesis,
  };
};