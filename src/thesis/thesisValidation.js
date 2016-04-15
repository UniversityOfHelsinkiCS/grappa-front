import Validation from "react-validation";
import weburl from "../config/urlRegexp";

Validation.extendErrors({
  isEmail: {
    className: "ui-email-validation-failed",
    message: "invalid email address",
  },
  isLink: {
    className: "ui-link-validation-failed",
    message: "invalid url",
    rule: (value) => !Boolean(value) || value.match(weburl),
  },
  isRequired: {
    className: "ui-required-failed",
    message: "field is required",
    rule: (value) => Boolean(Validation.validator.trim(value)),
  },
  isAlpha: {
    className: "ui-is-text-failed",
    message: "invalid characters",
  },
});

module.exports = Validation;
