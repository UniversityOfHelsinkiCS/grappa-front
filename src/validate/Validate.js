
import reducer from "./validate.reducer";
import Core from "./Core";
import { createForm, updateForm } from "./validate.actions";

// react-redux-validate

class Validate {

  constructor() {
    this.state = reducer(undefined, { type: "INIT" });
  }

  getForms() {
    return this.state.get("forms").toJS();
  }

  createForm(name, model) {
    this.state = reducer(this.state, createForm(name, model));
  }

  updateForm(value, field, formname) {
    const model = this.getForms()[formname].model;
    const errors = Core.validateField(value, field, model);
    this.state = reducer(this.state, updateForm({
      data: {
        value,
        field,
        formname,
      },
      errors,
    }))
  }

  getErrors(formname) {
    const form = this.getForms()[formname];
    return form ? form.errors : "";
  }

  getFieldErrors(field, formname) {
    const form = this.getForms()[formname];
    return form ? form.errors.obj[field] : "";
  }

  isFormValid(formname) {
    const form = this.getForms()[formname];
    if (form) {
      const errors = Core.validateForm(form);
      this.state = reducer(this.state, updateForm({
        data: {},
        errors,
      }));
      // this.props.updateForm({
      //   data: {},
      //   errors,
      // });
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

export default new Validate();