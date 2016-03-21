export const THESIS_GET_ALL_REQUEST = "THESIS_GET_ALL_REQUEST";
// export const THESIS_GET_ALL_SUCCESS = "THESIS_GET_ALL_SUCCESS";
// export const THESIS_GET_ALL_FAILURE = "THESIS_GET_ALL_FAILURE";

export const THESIS_RESET_ALL_REQUEST = "THESIS_RESET_ALL_REQUEST";

export const THESIS_SAVE_ONE_REQUEST = "THESIS_SAVE_ONE_REQUEST";
// export const THESIS_SAVE_ONE_SUCCESS = "THESIS_SAVE_ONE_SUCCESS";
// export const THESIS_SAVE_ONE_FAILURE = "THESIS_SAVE_ONE_FAILURE";
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

export const getTheses = () => {
  console.log("getTheses-action called!");
  return {
    type: THESIS_GET_ALL_REQUEST,
  };
};

export const resetTheses = () => {
  console.log("resetTheses-action called!");
  return {
    type: THESIS_RESET_ALL_REQUEST,
  };
};

export const addThesis = (Thesis) => {
  console.log("addThesis-action called!");
  return {
    type: THESIS_SAVE_ONE_REQUEST,
    body: Thesis,
  };
};

// export const getTHESISsAPI = () => ({
//   [CALL_API]: {
//     types: [
//       THESIS_GET_ALL_REQUEST,
//       THESIS_GET_ALL_SUCCESS,
//       THESIS_GET_ALL_FAILURE,
//     ],
//     endpoint: "/THESIS",
//     method: "get",
//   },
// });
//
// export const addTHESISAPI = (THESIS) => ({
//   [CALL_API]: {
//     types: [
//       THESIS_SAVE_ONE_REQUEST,
//       THESIS_SAVE_ONE_SUCCESS,
//       THESIS_SAVE_ONE_FAILURE,
//     ],
//     endpoint: "/THESIS",
//     method: "post",
//     body: THESIS,
//   },
// });
