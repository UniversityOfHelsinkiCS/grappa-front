const schemas = {
  userArray: {
    default: [],
    model: "userInactive",
    type: "array",
    rules: [
      {
        type: "minCount[2]",
        error: "You must have at least two graders.",
      },
    ],
  },
  userInactive: {
    firstname: {
      default: "",
      type: "string",
      rules: [
      ],
    },
    lastname: {
      default: "",
      type: "string",
      rules: [
      ],
    },
    role: {
      default: "instructor",
      type: "string",
      rules: [
      ],
    },
    StudfyFieldId: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty[ifRoleInstructorOrPrintPerson]",
          error: "You must choose studyfield for instructor or professor.",
        },
      ],
    },
    isActive: {
      default: false,
      type: "boolean",
      rules: [
      ],
    },
  },
};

import Validate from "../validate/Validate";
Validate.addSchemas(schemas);

export default schemas;
