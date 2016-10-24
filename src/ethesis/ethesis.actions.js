
export const THESIS_UPLOAD_ETHESIS_PDF = "THESIS_UPLOAD_ETHESIS_PDF";

export const uploadThesisPDF = (token, formdata) => (
  {
    type: THESIS_UPLOAD_ETHESIS_PDF,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for your file to be uploaded.",
    },
    successMessage: {
      type: "success",
      title: "Success",
      body: "Your Thesis was succesfully uploaded.",
    },
    payload: {
      request: {
        url: `/thesis/ethesis/${token}`,
        method: "post",
        data: formdata,
      }
    }
  }
);
