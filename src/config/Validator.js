import Validator from "validator";
import validationRules from "./validator.rules";

/**
 * Method for validating single value according to a rule listed below
 */
const validate = (rules, value) =>
  rules.reduce((previous, rule) => {
    console.log(previous);
    console.log(rule);
    if (rule.type === "notEmpty" && Validator.isNull(value)) {
      return [...previous, rule.prompt];
    } else if (rule.type === "validEmail" && !Validator.isEmail(value)) {
      return [...previous, rule.prompt];
    // } else if (rule.substring(0, 3) === "min" || rule.substring(0, 3) === "max") {
    //   const type = rule.substring(0, 3);
    //   if (rule.substring(3, 8) === "Count") {
    //     // Amount is between square brackets : minCount[2]
    //     const amount = parseInt(rule.substring(rule.indexOf("[")+1, rule.lastIndexOf("]")));
    //     if ((type === "min" && value.length < amount) || (type === "max" && value.length > amount)) {
    //       return [...previous, rule.prompt];
    //     }
    //   }
    }
    return previous;
  }, []);

/**
 * Validates one of model's fields
 *
 * @param {String} name - Name of the field
 * @param {Any} value - Value of the field
 * @param {String} model - Name of the model that can be found in rules-file
 * @return {Array} - Found errors
 */
export const validateField = (name, value, model) => {
  console.log(name + value + model);
  const errors = [];
  const validation = validationRules[model].find(field => {
    if (field.name === name) return field;
  });
  if (validation === undefined) {
    return [];
  } else if (validation.model !== undefined) {
    errors.push(...validateModel(value, validation.model).list);
  }
  return [...errors, ...validate(validation.rules, value)];
};

/**
 * Validates all of models' fields
 */
export const validateModel = (values, model) => {
  console.log(model);
  console.log(values);
  const errors = {
    obj: {},
    list: [],
  };
  if (typeof values === "object") {
    for (const key in values) {
      if ({}.hasOwnProperty.call(values, key)) {
        errors.obj[key] = [];
        const fieldErrors = validateField(key, values[key], model);
        console.log(fieldErrors);
        errors.obj[key] = fieldErrors;
        errors.list.push(...fieldErrors);
      }
    }
  // array of models
  // } else if (typeof values === "array") {
  //   const modelErrors = values.map(modelValues =>
  //     validateModel(modelValues, model)
  //   );
  //   console.log(modelErrors);
  }
  return errors;
};
