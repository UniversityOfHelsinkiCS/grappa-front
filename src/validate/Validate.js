
import reducer from "./validate.reducer";
import Core from "./Core";
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
    })
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
    const updatation = {
      formname,
      scope,
      update: () => {
        console.log("updating", formname)
        const newState = {};
        newState[formname] = this.state.get("forms").toJS()[formname];
        scope.setState(newState);
      }
    }
    updatation.update();
    this.subscribers.push(updatation);
  }

  unsubscribeFromForm(formname, id) {

  }

  createForm(name, model) {
    this.state = reducer(this.state, createForm(name, model));
    return this.state.get("forms").toJS()[name];
  }

  replaceForm(formname, newValues) {
    const errors = Core.validateForm(newValues);
    this._reduce(formname, replaceForm(newValues, errors));
    // this.state = reducer(this.state, replaceForm(newValues, errors))
  }

  updateForm(formname, field, value) {
    const model = this.getForm(formname).model;
    const errors = Core.validateField(model, field, value);
    this._reduce(formname, updateForm(formname, field, value, errors));
    // this.state = reducer(this.state, updateForm(formname, field, value, errors));
  }

  isFormValid(formname) {
    return true;
    const form = this.getForms()[formname];
    if (form) {
      const errors = Core.validateForm(form);
      this.state = reducer(this.state, updateForm("", "", "", errors));
      return errors.length === 0;
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