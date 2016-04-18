import Validation from "react-validation";
import weburl from "../config/urlRegexp";

Validation.extendErrors({
  isRequired: {
    className: "ui-required-failed",
    message: "field is required",
    rule: (value) => Boolean(Validation.validator.trim(value)),
  },
  isEmail: {
    className: "ui-email-validation-failed",
    message: "invalid email address",
  },
});

module.exports = Validation;
