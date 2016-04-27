/*
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
// export const THESIS_GET_ONE_SUCCESS = "THESIS_GET_ONE_SUCCESS";
// export const THESIS_GET_ONE_FAILURE = "THESIS_GET_ONE_FAILURE";

/*
* The action called to get a list of all the data related to the theses in the database.
* @return getTheses The object containing the relevant information for the
* reducer to handle the data accordingly.
*/
export const getTheses = () => {
  console.log("getTheses-action called!");
  return {
    type: CALL_API,
    success: THESIS_GET_ALL_SUCCESS,
    failure: THESIS_GET_ALL_FAILURE,
    method: "get",
    url: "/thesis",
    data: {},
  };
};

// export const getOneThesis = (id) => {
//   console.log("getOneThesis-action called!");
//   return {
//     type: CALL_API,
//     success: THESIS_GET_ONE_SUCCESS,
//     failure: THESIS_GET_ONE_FAILURE,
//     method: "get",
//     url: "/thesis/" + id,
//     data: {id},
//   }
// }

/*
* The action called to save the given data as a new thesis in the database.
* @param thesis An object cantaining all the relevant data of the new thesis thats
* to be added.
* @return saveThesis The object containing the relevant information for the
* reducer to handle the data accordingly.
*/
export const saveThesis = (thesis) => {
  console.log("saveThesis-action called!");
  return {
    type: CALL_API,
    success: THESIS_SAVE_ONE_SUCCESS,
    failure: THESIS_SAVE_ONE_FAILURE,
    method: "post",
    url: "/thesis",
    data: thesis,
  };
};

/*
 * The action used change some values in a thesis.
 * Used by Ethesis component.
 *
 * @param data object containing the fields we want to change
 * @return The object containing the relevant information for the
 * reducer to handle the data accordingly.
 *
 *
 */
export const updateThesis = (data) => {
  console.log("updateThesis-action called!");
  return {
    type: CALL_API,
    success: THESIS_UPDATE_ONE_SUCCESS,
    failure: THESIS_UPDATE_ONE_FAILURE,
    method: "put",
    url: `/thesis/${data.id}`,
    data,
  };
};
