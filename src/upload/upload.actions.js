import { CALL_API_AFTER_ACTION } from "../middleware/grappaAPI";

import {
  THESIS_SAVE_ONE_SUCCESS,
} from "../thesis/thesis.actions";

export const UPLOAD_REQUEST = "UPLOAD_REQUEST";
export const UPLOAD_SUCCESS = "UPLOAD_SUCCESS";
export const UPLOAD_FAILURE = "UPLOAD_FAILURE";

export const uploadReview = (data) => (
  {
    type: CALL_API_AFTER_ACTION,
    after: THESIS_SAVE_ONE_SUCCESS,
    next: UPLOAD_REQUEST,
    success: UPLOAD_SUCCESS,
    successMessage: {
      type: "success",
      title: "Success",
      body: "Thesis review was uploaded",
    },
    failure: UPLOAD_FAILURE,
    method: "post",
    url: "/thesis/review",
    data,
  }
);
