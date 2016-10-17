
export const ETHESIS_SENT = "ETHESIS_SENT";

export const updateThesisesEthesis = (token, link) => (
  {
    type: ETHESIS_SENT,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for ethesis link to be saved.",
    },
    successMessage: {
      type: "success",
      title: "Success",
      body: "Link has been saved.",
    },
    payload: {
      request: {
        method: "post",
        url: "/thesis/ethesis",
        data: {
          token,
          link,
        }
      }
    }
  }
);
