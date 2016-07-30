
import { CALL_API } from "../middleware/grappaAPI";

export const ETHESIS_SENT_SUCCESS = "ETHESIS_SENT_SUCCESS";
export const ETHESIS_SENT_FAILURE = "ETHESIS_SENT_FAILURE";

export const updateThesisesEthesis = (token, link) => (
  {
    type: CALL_API,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for ethesis link to be saved.",
    },
    success: ETHESIS_SENT_SUCCESS,
    successMessage: {
      type: "success",
      title: "Success",
      body: "Link has been saved.",
    },
    failure: ETHESIS_SENT_FAILURE,
    method: "post",
    url: "/thesis/ethesis",
    data: {
      token,
      link,
    }
  }
);