export const GRADER_GET_ALL = "GRADER_GET_ALL";
export const GRADER_SAVE_ONE = "GRADER_SAVE_ONE";
export const GRADER_UPDATE_ONE = "GRADER_UPDATE_ONE";

export const getGraders = () => (
  {
    type: GRADER_GET_ALL,
    payload: {
      request: {
        url: "/grader",
        method: "get",
        data: {}
      }
    }
  }
);

export const saveGrader = (data) => (
  {
    type: GRADER_SAVE_ONE,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for Grader to be saved.",
    },
    successMessage: {
      type: "success",
      title: "Success",
      body: "Grader was saved.",
    },
    payload: {
      request: {
        method: "post",
        url: "/grader",
        data,
      }
    }
  }
);

export const updateGrader = (data) => (
  {
    type: GRADER_UPDATE_ONE,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for Grader to be updated.",
    },
    successMessage: {
      type: "success",
      title: "Success",
      body: "Grader was updated.",
    },
    payload: {
      request: {
        method: "put",
        url: `/grader/${data.id}`,
        data,
      }
    }
  }
);
