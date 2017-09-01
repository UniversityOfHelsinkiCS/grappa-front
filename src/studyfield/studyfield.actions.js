export const STUDYFIELD_GET_ALL = "STUDYFIELD_GET_ALL";
export const STUDYFIELD_SAVE_ONE = "STUDYFIELD_SAVE_ONE";
export const STUDYFIELD_UPDATE_ONE = "STUDYFIELD_UPDATE_ONE";
export const STUDYFIELD_DELETE_ONE = "STUDYFIELD_DELETE_ONE";

export const getStudyfields = () => (
  {
    type: STUDYFIELD_GET_ALL,
    payload: {
      request: {
        url: "/studyfield",
        method: "get",
        data: {}
      }
    }
  }
);

export const saveStudyfield = (data) => (
  {
    type: STUDYFIELD_SAVE_ONE,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for Studyfield to be saved.",
    },
    successMessage: {
      type: "success",
      title: "Success",
      body: "Studyfield was saved.",
    },
    payload: {
      request: {
        method: "post",
        url: "/studyfield",
        data,
      }
    }
  }
);

export const updateStudyfield = (data) => (
  {
    type: STUDYFIELD_UPDATE_ONE,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for Studyfield to be updated.",
    },
    successMessage: {
      type: "success",
      title: "Success",
      body: "Studyfield was updated.",
    },
    payload: {
      request: {
        method: "put",
        url: `/studyfield/${data.id}`,
        data,
      }
    }
  }
);

export const deleteStudyfield = (studyfieldId) => (
  {
    type: STUDYFIELD_DELETE_ONE,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for Studyfield to be deleted.",
    },
    successMessage: {
      type: "success",
      title: "Success",
      body: "Studyfield was deleted.",
    },
    payload: {
      request: {
        method: "delete",
        url: `/studyfield/${studyfieldId}`,
        data: {},
      }
    }
  }
)
