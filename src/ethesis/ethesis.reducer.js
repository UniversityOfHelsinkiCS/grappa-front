import { fromJS } from "immutable";

const INITIAL_STATE = fromJS({
  status: "",
  loading: false,
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "THESIS_UPLOAD_ETHESIS_PDF_REQUEST":
      return state.merge({
        status: "",
        loading: true,
      });
    case "THESIS_UPLOAD_ETHESIS_PDF_SUCCESS":
      return state.merge({
        status: "success",
        loading: false,
      });
    case "THESIS_UPLOAD_ETHESIS_PDF_FAILURE":
      return state.merge({
        status: "failure",
        loading: false,
      });
    default:
      return state;
  }
}
