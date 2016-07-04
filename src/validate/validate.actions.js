export const CREATE_MODEL = "CREATE_MODEL";
export const UPDATE_MODEL = "UPDATE_MODEL";

export const createModel = (name, model) => (
  {
    type: CREATE_MODEL,
    payload: {
      name,
      model,
    },
  }
);

export const updateModel = (data, errors) => (
  {
    type: UPDATE_MODEL,
    payload: {
      data,
      errors,
    },
  }
);
