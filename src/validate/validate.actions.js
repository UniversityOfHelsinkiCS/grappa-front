export const CREATE_FORM = "CREATE_FORM";
export const UPDATE_FORM = "UPDATE_FORM";

export const createForm = (name, model) => (
  {
    type: CREATE_FORM,
    payload: {
      name,
      model,
    },
  }
);

export const updateForm = (data, errors) => (
  {
    type: UPDATE_FORM,
    payload: {
      data,
      errors,
    },
  }
);

// export const resetForm = (name) => (
//   {
//     type: RESET_FORM,
//     payload: {
//       name,
//     },
//   }
// );
