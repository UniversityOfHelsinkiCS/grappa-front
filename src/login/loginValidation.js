import Validation from "react-validation";
import weburl from "../config/urlRegexp";

Validation.extendErrors({
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
