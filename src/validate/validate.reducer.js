import { fromJS } from "immutable";
import {
  CREATE_FORM,
  UPDATE_FORM,
} from "./validate.actions";

import Schemas from "./validate.schemas";

const createDefaultValues = (model) => {
  return Object.keys(Schemas[model]).reduce((previous, current) => {
    return previous[current] = Schemas.model[current].default;
  }, {});
};

const INITIAL_STATE = fromJS({
  forms: {},
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_FORM:
      const defaultValues = createDefaultValues(action.payload.model);
      return state.mergeIn(["forms", action.payload.name], fromJS({
        model: action.payload.model,
        values: defaultValues,
        errors: {
          obj: {},
          list: [],
        }
      }));
    case UPDATE_FORM:
      const updatedValue = state.mergeIn(["forms", action.payload.formname, action.payload.field],
        fromJS(action.payload.value)
      );
      return updatedValue.mergeIn(["forms", action.payload.formname, "errors"],
        fromJS(action.payload.errors)
      );
    default:
      return state;
  }
}
