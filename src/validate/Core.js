import Validator from "validator";
import Schemas from "./validate.schemas";

class ValidateCore {

  findValidationRule(field, model) {
    return Schemas[model][field].rules.find(modelfield => {
      if (modelfield.name === field) return modelfield;
    });
  }

  setCustomRules(customRules) {
    this.customRules = customRules;
  }

  customValidate(rules, value) {
    // overridable method for custom validation rules
  }

  /**
   * Method for validating single value according to a rule listed below
   */
  validate(rules, value) {
    return rules.reduce((previous, rule) => {
      if (rule.type === "notEmpty" && Validator.isNull(value)) {
        return [...previous, rule.error];
      } else if (rule.type === "validEmail" && !Validator.isEmail(value)) {
        return [...previous, rule.error];
      } else if (rule.type.substring(0, 3) === "min" || rule.type.substring(0, 3) === "max") {
        const prefix = rule.type.substring(0, 3);
        if (rule.type.substring(3, 8) === "Count") {
          // Amount is between square brackets : minCount[2]
          const amount = parseInt(rule.type.substring(rule.type.indexOf("[") + 1, rule.type.lastIndexOf("]")), 10);
          if ((prefix === "min" && value.length < amount) || (prefix === "max" && value.length > amount)) {
            return [...previous, rule.error];
          }
        } else if (rule.type.substring(3, 9) === "Length") {
          const amount = parseInt(rule.type.substring(rule.type.indexOf("[") + 1, rule.type.lastIndexOf("]")), 10);
          if ((prefix === "min" && value.length < amount) || (prefix === "max" && value.length > amount)) {
            return [...previous, rule.error];
          }
        }
      }
      return previous;
    }, []);
  }

  validate2(rules, value) {
    return rules.reduce((previous, rule) => {
      if (rule.type === "notEmpty" && Validator.isNull(value)) {
        return [...previous, rule.error];
      } else if (rule.type === "validEmail" && !Validator.isEmail(value)) {
        return [...previous, rule.error];
      } else if (rule.type.substring(0, 3) === "min" || rule.type.substring(0, 3) === "max") {
        const prefix = rule.type.substring(0, 3);
        if (rule.type.substring(3, 8) === "Count") {
          // Amount is between square brackets : minCount[2]
          const amount = parseInt(rule.type.substring(rule.type.indexOf("[") + 1, rule.type.lastIndexOf("]")), 10);
          if ((prefix === "min" && value.length < amount) || (prefix === "max" && value.length > amount)) {
            return [...previous, rule.error];
          }
        } else if (rule.type.substring(3, 9) === "Length") {
          const amount = parseInt(rule.type.substring(rule.type.indexOf("[") + 1, rule.type.lastIndexOf("]")), 10);
          if ((prefix === "min" && value.length < amount) || (prefix === "max" && value.length > amount)) {
            return [...previous, rule.error];
          }
        }
      }
      return previous;
    }, []);
  }

  /**
   * Validates one of model's fields
   *
   * @param {String} name - Name of the field
   * @param {Any} value - Value of the field
   * @param {String} modelname - Name of the model that can be found in rules-file
   * @return {Array} - Found errors
   */
  validateField(model, field, value) {
    // console.log(model, field, value)
    const errors = {};
    const fieldErrors = this.validate(Schemas[model][field].rules, value);
    errors[`${model}_${field}`] = fieldErrors;
    // console.log(errors)
    return errors;
  }

  /**
   * Validates all of models' fields
   */
  validateForm(values, model) {
    // console.log(modelname);
    // console.log(values);
    let errors = {};
    if (values.constructor === Object) {
      for (const key in values) {
        if ({}.hasOwnProperty.call(values, key)) {
          // errors[`${model}_${key}`] = this.validateField(model, key, values[key]);
          Object.assign(errors, this.validateField(model, key, values[key]));
          // if (fieldErrors.length > 0) {
          //   errors[`${model}_${key}`] = fieldErrors;
          // }
          const validation = this.findValidationRule(key, model);
          if (validation !== undefined && validation.model !== undefined) {
            const modelErrors = this.validateForm(values[key], validation.model);
            console.log(modelErrors);
            errors = Object.assign(errors.obj, modelErrors.obj);
          }
        }
      }
    // array of instances of models
    } else if (values.constructor === Array) {

      throw new Error("doesnt work");

      console.log("array of forms????!");
      console.log(values);
      errors = values.reduce((previous, item) => {
        console.log(previous);
        const modelErrors = validateForm(item, modelname);
        console.log(modelErrors);
        const newErrors = {
          list: Object.assign(previous.list, modelErrors.list),
          obj: Object.assign(previous.obj, modelErrors.obj),
        };
        return newErrors;
      }, { list: [], obj: {} });
      console.log(errors);
    }
    // console.log(errors)
    return errors;
  }
}

export default new ValidateCore();
