import { CALL_API } from "../middleware/grappaAPI";

export const STUDYFIELD_GET_ALL_SUCCESS = "STUDYFIELD_GET_ALL_SUCCESS";
export const STUDYFIELD_GET_ALL_FAILURE = "STUDYFIELD_GET_ALL_FAILURE";

export const getStudyfields = () => (
  {
    type: CALL_API,
    success: STUDYFIELD_GET_ALL_SUCCESS,
    failure: STUDYFIELD_GET_ALL_FAILURE,
    method: "get",
    url: "/studyfield",
    data: {},
  }
);
