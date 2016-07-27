
import Core from "./Core";
import reducer from "./validate.reducer";
import { createForm, updateForm, replaceForm } from "./validate.actions";

// react-redux-validate

class Validate {

  constructor() {
    this.state = reducer(undefined, { type: "INIT" });
    this.subscribers = [];
  }

  _reduce(formname, action) {
    this.state = reducer(this.state, action);
    this.subscribers.map(subscriber => {
      if (subscriber.formname === formname) {
        subscriber.update();
      }
    });
  }

  getForms() {
    return this.state.get("forms").toJS();
  }

  getForm(formname) {
    return this.state.get("forms").toJS()[formname];
  }

  getFormField(formname, field) {
    return this.state.get("forms").toJS()[formname].values[field];
  }

  getFormErrors(formname) {
    return this.state.get("forms").toJS()[formname].errors;
  }

  getFieldErrors(formname, model, field) {
    return this.state.get("forms").toJS()[formname].errors[`${model}_${field}`];
  }

  subscribeToForm(formname, scope, setState) {
    const subscription = {
      formname,
      scope,
      update: () => {
        // console.log("updating", formname)
        const newState = {};
        newState[formname] = this.getForm(formname);
        // console.log(newState);
        scope.setState(newState);
      }
    };
    subscription.update();
    this.subscribers.push(subscription);
  }

  unsubscribeFromForm(formname, id) {

  }

  createForm(name, model) {
    this.state = reducer(this.state, createForm(name, model));
    return this.getForm(name);
  }

  resetForm(formname) {

  }

  replaceForm(formname, newValues) {
    const errors = Core.validateForm(newValues);
    this._reduce(formname, replaceForm(newValues, errors));
  }

  updateForm(formname, field, value) {
    const model = this.getForm(formname).model;
    const errors = Core.validateField(model, field, value);
    this._reduce(formname, updateForm(formname, field, value, errors));
  }

  isFormValid(formname) {
    const form = this.getForm(formname);
    if (form) {
      const errors = Core.validateForm(form.values, form.model);
      this._reduce(formname, updateForm(formname, "", "", errors));
      const count = Object.keys(errors).reduce((previousValue, key) => {
        return previousValue + errors[key].length;
      }, 0);
      console.log(count);
      return count === 0;
      // return errors.length === 0;
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

  overrideCustomRules(customRules) {
    // Core.setCustomRules(customRules);
  }
}

export default new Validate();
