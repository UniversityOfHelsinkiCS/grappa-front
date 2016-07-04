import { fromJS } from "immutable";
import {
  CREATE_MODEL,
  UPDATE_MODEL,
} from "./validate.actions";

import Models from "./validate.models";

const createModel = (model) => {
  return Object.keys(Models[model]).reduce((previous, current) => {
    return previous[current] = Models.model[current].default;
  }, {});
};

const INITIAL_STATE = fromJS({
  models: {},
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_MODEL:
      const newModel = createModel(action.payload.model);
      // return state.mergeIn(["models"], models => {
      //   return models.get([action.payload.name]) = fromJS({
      //     values: newModel,
      //     errors: {
      //       obj: {},
      //       list: [],
      //     }
      //   });
      // })
      return state.mergeIn(["users", action.payload.name], fromJS({
        values: newModel,
        errors: {
          obj: {},
          list: [],
        }
      }));
    case UPDATE_MODEL:
      const updatedValue = state.mergeIn(["models", action.payload.model, action.payload.name],
        fromJS(action.payload.value)
      );
      return updatedValue.mergeIn(["models", action.payload.model, "errors"],
        fromJS(action.payload.errors)
      );
    default:
      return state;
  }
}
