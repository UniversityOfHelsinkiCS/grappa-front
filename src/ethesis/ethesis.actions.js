
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

export const uploadThesisPDF = (token, formdata) => (
  {
    type: "THESIS_UPLOAD_PDF",
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for Thesis PDF to be uploaded.",
    },
    successMessage: {
      type: "success",
      title: "Success",
      body: "Your Thesis was succesfully uploaded.",
    },
    payload: {
      request: {
        url: `/thesis/abstract/${token}`,
        method: "post",
        data: formdata,
      }
    }
  }
);
