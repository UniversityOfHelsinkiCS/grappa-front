/**
* The file containing all the defined actions that one can call to gain access
* to modifying the state in regard to listing, adding and viewing theses.
*/
import { CALL_API } from "../middleware/grappaAPI";

export const THESIS_GET_ALL_SUCCESS = "THESIS_GET_ALL_SUCCESS";
export const THESIS_GET_ALL_FAILURE = "THESIS_GET_ALL_FAILURE";

export const THESIS_SAVE_ONE_SUCCESS = "THESIS_SAVE_ONE_SUCCESS";
export const THESIS_SAVE_ONE_FAILURE = "THESIS_SAVE_ONE_FAILURE";

export const THESIS_UPDATE_ONE_SUCCESS = "THESIS_UPDATE_ONE_SUCCESS";
export const THESIS_UPDATE_ONE_FAILURE = "THESIS_UPDATE_ONE_FAILURE";

export const THESIS_DELETE_ONE_SUCCESS = "THESIS_DELETE_ONE_SUCCESS";
export const THESIS_DELETE_ONE_FAILURE = "THESIS_DELETE_ONE_FAILURE";
// export const THESIS_GET_ONE_SUCCESS = "THESIS_GET_ONE_SUCCESS";
// export const THESIS_GET_ONE_FAILURE = "THESIS_GET_ONE_FAILURE";

export const THESIS_DOWNLOAD_SUCCESS = "THESIS_DOWNLOAD_SUCCESS";
export const THESIS_DOWNLOAD_FAILURE = "THESIS_DOWNLOAD_FAILURE";

/**
* The action called to get a list of all the data related to the theses in the database.
* @return getTheses The object containing the relevant information for the
* reducer to handle the data accordingly.
*/
export const getTheses = () => (
  {
    type: CALL_API,
    success: THESIS_GET_ALL_SUCCESS,
    failure: THESIS_GET_ALL_FAILURE,
    method: "get",
    url: "/thesis",
    data: {},
  }
);

/**
 * Action-creator for deleting a thesis
 *
 * @param {Object} thesis - Thesis to delete, needs to put into data-field for the reducer
 * @return {Object} - Action for API to handle
 */
export const deleteThesis = (thesis) => (
  {
    type: CALL_API,
    success: THESIS_DELETE_ONE_SUCCESS,
    successMessage: {
      type: "warning",
      title: "Success",
      body: "Thesis was deleted.",
    },
    failure: THESIS_DELETE_ONE_FAILURE,
    failureMessage: {
      type: "error",
      title: "Error",
      body: "Deletion of the thesis failed.",
    },
    method: "delete",
    url: `/thesis/${thesis.id}`,
    data: thesis,
  }
);

/**
* The action called to save the given data as a new thesis in the database.
* @param thesis An object cantaining all the relevant data of the new thesis thats
* to be added.
* @return saveThesis The object containing the relevant information for the
* reducer to handle the data accordingly.
*/
export const saveThesis = (thesis) => (
  {
    type: CALL_API,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for Thesis to be saved.",
    },
    success: THESIS_SAVE_ONE_SUCCESS,
    successMessage: {
      type: "success",
      title: "Success",
      body: "Thesis was saved.",
    },
    failure: THESIS_SAVE_ONE_FAILURE,
    method: "post",
    url: "/thesis",
    data: thesis,
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
    type: CALL_API,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for Thesis to be updated.",
    },
    success: THESIS_UPDATE_ONE_SUCCESS,
    successMessage: {
      type: "success",
      title: "Success",
      body: "Thesis was updated.",
    },
    failure: THESIS_UPDATE_ONE_FAILURE,
    method: "put",
    url: `/thesis/${data.id}`,
    data,
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
    type: CALL_API,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for Theses to be combined into single PDF.",
    },
    success: THESIS_DOWNLOAD_SUCCESS,
    successMessage: {
      type: "success",
      title: "Success",
      body: "Theses were generated into PDF.",
    },
    failure: THESIS_DOWNLOAD_FAILURE,
    method: "post",
    url: `/thesis/pdf`,
    responseType: "arraybuffer",
    data,
  }
);
