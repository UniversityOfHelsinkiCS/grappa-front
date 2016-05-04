import Validation from "react-validation";
import Validator from "validator";
import weburl from "../config/urlRegexp";

Validation.extendErrors({
  isEmail: {
    className: "ui-email-validation-failed",
    message: "Invalid email address",
  },
  isLink: {
    className: "ui-link-validation-failed",
    message: "Invalid url",
    rule: (value) => !Boolean(value) || value.match(weburl),
  },
  isRequired: {
    className: "ui-required-failed",
    message: "Field is required",
    rule: (value) => Boolean(Validator.trim(value)),
  },
});

module.exports = Validation;
