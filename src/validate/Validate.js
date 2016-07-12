import Core from "./Core";

// react-redux-validate

export default class Validate {

  createForm(name, model) {
    this.props.createForm(name, model);
  }

  updateForm(value, field, formname) {
    const model = this.props.forms[formname].model;
    const errors = Core.validateField(value, field, model);
    this.props.updateForm({
      data: {
        value,
        field,
        formname,
      },
      errors,
    });
  }

  getErrors(formname) {
    const form = this.props.forms[formname];
    if (form) {
      return form.errors;
    } else {
      return "";
    }
  }

  getFieldErrors(field, formname) {
    const form = this.props.forms[formname];
    if (form) {
      return form.errors.obj[field];
    } else {
      return "";
    }
  }

  isFormValid(formname) {
    const form = this.props.forms[formname];
    if (form) {
      const errors = Core.validateForm(form);
      this.props.updateForm({
        data: {},
        errors,
      });
      return errors.list.length === 0;
    } else {
      return false;
    }
  }

  validateDataToModel(data, model) {
    const form = {
      model,
      values: data,
      errors: {
        obj: {},
        list: [],
      }
    };
    const errors = Core.validateForm(form);
    return errors;
  }
}

import { connect } from "react-redux";
import { createForm, updateForm } from "./validate.actions";

const mapStateToProps = (state) => {
  const validate_r = state.get("validate");
  return {
    forms: validate_r.get("forms").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  createForm(name, model) {
    dispatch(createForm(name, model));
  },
  updateForm(data, errors) {
    dispatch(updateForm(data, errors));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Validate);
