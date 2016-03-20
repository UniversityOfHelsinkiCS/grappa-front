import { CALL_API } from "../api/TestiItemAPI";

export const TESTIITEM_GET_ALL_REQUEST = "TESTIITEM_GET_ALL_REQUEST";
export const TESTIITEM_GET_ALL_SUCCESS = "TESTIITEM_GET_ALL_SUCCESS";
export const TESTIITEM_GET_ALL_FAILURE = "TESTIITEM_GET_ALL_FAILURE";

export const TESTIITEM_SAVE_ONE_REQUEST = "TESTIITEM_SAVE_ONE_REQUEST";
export const TESTIITEM_SAVE_ONE_SUCCESS = "TESTIITEM_SAVE_ONE_SUCCESS";
export const TESTIITEM_SAVE_ONE_FAILURE = "TESTIITEM_SAVE_ONE_FAILURE";
/*
export const addExercise = (exercise) => ({
  [CALL_API]: {
    types: [
      EXERCISES_ADD_REQUEST,
      EXERCISES_ADD_SUCCESS,
      EXERCISES_ADD_FAILURE,
    ],
    endpoint: "/exercises",
    method: "post",
    body: exercise,
    validate: validateExercise,
  },
});
*/

export const getTestiItems = () => {
  console.log("getTestiItems-action called!");
  return {
    type: TESTIITEM_GET_ALL_REQUEST,
  }
}

export const addTestiItem = (TestiItem) => {
  console.log("addTestiItem-action called!");
  return {
    type: TESTIITEM_SAVE_ONE_REQUEST,
    body: TestiItem,
  }
}

export const getTestiItemsAPI = () => ({
  [CALL_API]: {
    types: [
      TESTIITEM_GET_ALL_REQUEST,
      TESTIITEM_GET_ALL_SUCCESS,
      TESTIITEM_GET_ALL_FAILURE,
    ],
    endpoint: "/testiItem",
    method: "get"
  },
});

export const addTestiItemAPI = (testiItem) => ({
  [CALL_API]: {
    types: [
      TESTIITEM_SAVE_ONE_REQUEST,
      TESTIITEM_SAVE_ONE_SUCCESS,
      TESTIITEM_SAVE_ONE_FAILURE,
    ],
    endpoint: "/testiItem",
    method: "post",
    body: testiItem
  },
});
