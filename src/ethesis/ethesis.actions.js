
import { CALL_API } from "../middleware/grappaAPI";

export const ETHESIS_SENT_SUCCESS = "ETHESIS_SENT_SUCCESS";
export const ETHESIS_SENT_FAILURE = "ETHESIS_SENT_FAILURE";

export const updateThesisesEthesis = (data) => (
  {
    type: CALL_API,
    success: ETHESIS_SENT_SUCCESS,
    failure: ETHESIS_SENT_FAILURE,
    method: "post",
    url: "/thesis/ethesis",
    data,
  }
);
