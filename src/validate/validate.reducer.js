import { fromJS } from "immutable";
import {
  CREATE_FORM,
  UPDATE_FORM,
  REPLACE_FORM,
} from "./validate.actions";

import Schemas from "./validate.schemas";

const createDefaultValues = (model) => {
  return Object.keys(Schemas[model]).reduce((previousValue, key, index) => {
    previousValue[key] = Schemas[model][key].default;
    return previousValue;
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
        errors: {}
      }));
    case UPDATE_FORM:
      const updatedValue = state.mergeIn(["forms", action.payload.formname, "values", action.payload.field],
        fromJS(action.payload.value)
      );
      return updatedValue.mergeIn(["forms", action.payload.formname, "errors"],
        fromJS(action.payload.errors)
      );
    case REPLACE_FORM:
      const replacedForm = state.mergeIn(["forms", action.payload.formname, "values"],
        fromJS(action.payload.values)
      );
      return replacedForm.mergeIn(["forms", action.payload.formname, "errors"],
        fromJS(action.payload.errors)
      );
    default:
      return state;
  }
}
