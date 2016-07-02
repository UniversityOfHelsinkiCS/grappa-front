import Validator from "validator";

const isNotValid = (value, rule) => {
  switch (rule.type) {
    case "notEmpty":
      return Validator.isNull(value),
    case "validEmail":
      return !Validator.isEmail(value);
    case (rule.type.substring(0, 3) === "min" || rule.type.substring(0, 3) === "max"):
      const prefix = rule.type.substring(0, 3);
      if (rule.type.substring(3, 8) === "Count") {
        // Amount is between square brackets : minCount[2]
        const amount = parseInt(rule.type.substring(rule.type.indexOf("[") + 1, rule.type.lastIndexOf("]")), 10);
        if ((prefix === "min" && value.length < amount) || (prefix === "max" && value.length > amount)) {
          return true;
        }
      } else if (rule.type.substring(3, 9) === "Length") {
        const amount = parseInt(rule.type.substring(rule.type.indexOf("[") + 1, rule.type.lastIndexOf("]")), 10);
        if ((prefix === "min" && value.length < amount) || (prefix === "max" && value.length > amount)) {
          return true;
        }
      }
    default:
      return false;
  }
}

const validate = (rules, value) =>
  rules.reduce((previous, rule) => {
    if (isNotValid(value, rule)) {
      return [...previous, rule.prompt];
    } else {
      return previous
    }
  }, []);

export default isNotValid;