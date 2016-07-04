import Core from "./Core";

// react-redux-validate

export default class Validate {

  createModel(name, model) {
    this.props.createModel(name, model);
  }

  updateModel(value, name, model) {
    const errors = Core.validateField(value, name, model);
    this.props.updateModel({
      data: {
        value,
        name,
        model,
      },
      errors,
    });
  }

  getErrors(name, modelname) {
    const model = this.props.models[modelname];
    if (model) {
      return model.obj[name];
    } else {
      return [];
    }
  }

  isModelValid(modelname) {
    const model = this.props.models[modelname];
    if (model) {
      const errors = Core.validateModel(modelname);
      this.props.updateModel({
        data: {},
        errors,
      });
      return errors.list.length === 0;
    } else {
      return false;
    }
  }
}

import { connect } from "react-redux";
import { createModel, updateModel } from "./validate.actions";

const mapStateToProps = (state) => {
  const validate = state.get("validate");
  return {
    models: validate.get("models").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  createModel(name, model) {
    dispatch(createModel(name, model));
  },
  updateModel(data, errors) {
    dispatch(updateModel(data, errors));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Validate);
