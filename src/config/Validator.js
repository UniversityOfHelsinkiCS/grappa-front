import Validator from "validator";
import validationRules from "./ValidatorRules";

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
    }
    return previous;
  }, []);


/**
 * Validates one of Thesis' fields
 *
 * @param {String} name - Name of the field
 * @param {Any} value - Value of the field
 * @return {Array} - Found errors
 */
export const validateThesisField = (name, value) => {
  const validation = validationRules.find(field => {
    if (field.name === name) return field;
  });
  if (validation === undefined) {
    return [];
  }
  return validate(validation.rules, value);
};

/**
 * Validates all of the Thesis' fields
 */
// export const validateThesis = (thesis) => {
//   const errors = {};
//   for (const key in thesis) {
//     errors[key] = [];
//     const validation = thesisValidation.filter(field => {
//       if (field.name === key) return field;
//     });
//     validation.rules.map(rule => {
//       if (rule.type === "notEmpty" && Validator.isNull(thesis[key])) {
//         errors[key].push(rule.prompt);
//       } else if (rule.type === "validEmail" && !Validator.isEmail(thesis[key])) {
//         errors[key].push(rule.prompt);
//       }
//     });
//   }
//   return errors;
// };
