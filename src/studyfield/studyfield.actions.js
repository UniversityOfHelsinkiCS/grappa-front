import { CALL_API } from "../middleware/grappaAPI";

export const STUDYFIELD_GET_ALL_SUCCESS = "STUDYFIELD_GET_ALL_SUCCESS";
export const STUDYFIELD_GET_ALL_FAILURE = "STUDYFIELD_GET_ALL_FAILURE";

export const STUDYFIELD_SAVE_ONE_SUCCESS = "STUDYFIELD_SAVE_ONE_SUCCESS";
export const STUDYFIELD_SAVE_ONE_FAILURE = "STUDYFIELD_SAVE_ONE_FAILURE";

export const STUDYFIELD_UPDATE_ONE_SUCCESS = "STUDYFIELD_UPDATE_ONE_SUCCESS";
export const STUDYFIELD_UPDATE_ONE_FAILURE = "STUDYFIELD_UPDATE_ONE_FAILURE";

export const getStudyFields = () => (
  {
    type: CALL_API,
    success: STUDYFIELD_GET_ALL_SUCCESS,
    failure: STUDYFIELD_GET_ALL_FAILURE,
    method: "get",
    url: "/studyfield",
    data: {},
  }
);

export const createStudyField = () => (
  {
    type: CALL_API,
    success: STUDYFIELD_GET_ALL_SUCCESS,
    failure: STUDYFIELD_GET_ALL_FAILURE,
    method: "get",
    url: "/studyfield",
    data: {},
  }
);

export const updateStudyField = () => (
  {
    type: CALL_API,
    success: STUDYFIELD_GET_ALL_SUCCESS,
    failure: STUDYFIELD_GET_ALL_FAILURE,
    method: "get",
    url: "/studyfield",
    data: {},
  }
);
