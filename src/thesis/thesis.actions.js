export const THESIS_GET_ALL = "THESIS_GET_ALL";
export const THESIS_SAVE_ONE = "THESIS_SAVE_ONE";
export const THESIS_UPDATE_ONE = "THESIS_UPDATE_ONE";
export const THESIS_DELETE_ONE = "THESIS_DELETE_ONE";
export const THESIS_DOWNLOAD = "THESIS_DOWNLOAD";
export const THESISPROGRESS_UPDATE_ONE = "THESISPROGRESS_UPDATE_ONE";

/**
* The action called to get a list of all the data related to the theses in the database.
* @return getTheses The object containing the relevant information for the
* reducer to handle the data accordingly.
*/
export const getTheses = () => (
  {
    type: THESIS_GET_ALL,
    payload: {
      request: {
        url: "/thesis",
        method: "get",
        data: {}
      }
    }
  }
);

/**
 * Action-creator for deleting a thesis
 *
 * @param {Object} thesis - Thesis to delete, needs to put into data-field for the reducer
 * @return {Object} - Action for API to handle
 */
export const deleteThesis = (thesisId) => (
  {
    type: THESIS_DELETE_ONE,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for Thesis to be deleted.",
    },
    successMessage: {
      type: "warning",
      title: "Success",
      body: "Thesis was deleted.",
    },
    payload: {
      request: {
        url: `/thesis/${thesisId}`,
        method: "delete",
        data: {},
      }
    }
  }
);

export const saveThesisWithReview = (data) => (
  {
    type: THESIS_SAVE_ONE,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for Thesis to be saved.",
    },
    successMessage: {
      type: "success",
      title: "Success",
      body: "Thesis and review were saved.",
    },
    payload: {
      request: {
        url: "/thesis",
        method: "post",
        data,
      }
    }
  }
);

/**
 * The action used to change some values in a thesis.
 *
 * @param data object containing the fields we want to change
 * @return The object containing the relevant information for the
 * reducer to handle the data accordingly.
 */
export const updateThesis = (data) => (
  {
    type: THESIS_UPDATE_ONE,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for Thesis to be updated.",
    },
    successMessage: {
      type: "success",
      title: "Success",
      body: "Thesis was updated.",
    },
    payload: {
      request: {
        method: "put",
        url: `/thesis/${data.id}`,
        data,
      }
    }
  }
);

/**
 * The action used to change some values in a thesis.
 * Used by Ethesis component.
 *
 * @param data object containing the fields we want to change
 * @return The object containing the relevant information for the
 * reducer to handle the data accordingly.
 */
export const downloadTheses = (data) => (
  {
    type: THESIS_DOWNLOAD,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for Theses to be combined into single PDF.",
    },
    successMessage: {
      type: "success",
      title: "Success",
      body: "Theses were generated into PDF.",
    },
    payload: {
      request: {
        url: "/thesis/pdf",
        method: "post",
        responseType: "arraybuffer",
        data,
      }
    }
  }
);

export const updateThesisProgress = (data) => (
  {
    type: THESISPROGRESS_UPDATE_ONE,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for ThesisProgress to be updated.",
    },
    successMessage: {
      type: "success",
      title: "Success",
      body: "ThesisProgress was updated.",
    },
    payload: {
      request: {
        url: `/thesisprogress/${data.id}`,
        method: "put",
        data,
      }
    }
  }
);
