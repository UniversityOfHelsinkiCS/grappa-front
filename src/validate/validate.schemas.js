const schemas = {
  thesis: {
    authorFirstname: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          error: "First name can't be empty.",
        },
      ],
    },
    authorLastname: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          error: "First name can't be empty.",
        },
      ],
    },
    authorEmail: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          error: "Email can't be empty.",
        },
        {
          type: "validEmail",
          error: "Not a valid email.",
        },
      ],
    },
    title: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          error: "Title can't be empty.",
        },
      ],
    },
    urkund: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          error: "Urkund link can't be empty.",
        },
        {
          type: "isLink",
          error: "Urkund link isn't a valid link.",
        },
      ],
    },
    grade: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          error: "You must choose a grade.",
        },
      ],
    },
    Graders: {
      default: [],
      // model: "grader",
      type: "array",
      rules: [
        {
          type: "minCount[2]",
          error: "You must have at least two graders.",
        },
      ],
    },
    StudyFieldId: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          error: "You must choose a studyfield.",
        },
      ],
    },
    CouncilMeetingId: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          error: "You must choose a council meeting.",
        },
      ],
    },
    PdfFile: {
      default: "",
      type: "file",
      rules: [
        {
          type: "notEmpty",
          error: "You must choose a file to upload.",
        },
      ],
    },
  },
  grader: {
    name: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          error: "Name can't be empty.",
        },
      ],
    },
    title: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          error: "Title can't be empty.",
        },
      ],
    },
  },
  graderEdit: {
    id: {
      default: "",
      type: "number",
      rules: [
        {
          type: "notEmpty",
          error: "Name can't be empty.",
        },
      ],
    },
    name: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          error: "Name can't be empty.",
        },
      ],
    },
    title: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          error: "Title can't be empty.",
        },
      ],
    },
  },
  user: {
    firstname: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          error: "First name can't be empty.",
        },
      ],
    },
    lastname: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          error: "Second name can't be empty.",
        },
      ],
    },
    email: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          error: "Email can't be empty.",
        },
        {
          type: "validEmail",
          error: "Not a valid email.",
        },
      ],
    },
    password: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          error: "Password can't be empty.",
        },
        {
          type: "minLength[8]",
          error: "Password must be at least 8 characters.",
        },
      ],
    },
    passwordConf: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          error: "Password confirmation can't be empty.",
        },
        {
          type: "equal[password]",
          error: "Passwords must match.",
        },
      ],
    },
  },
  userEdit: {
    id: {
      default: "",
      type: "string",
      rules: [
      ],
    },
    firstname: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          error: "First name can't be empty.",
        },
      ],
    },
    lastname: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          error: "Second name can't be empty.",
        },
      ],
    },
    email: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          error: "Email can't be empty.",
        },
        {
          type: "validEmail",
          error: "Not a valid email.",
        },
      ],
    },
    role: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          error: "Password can't be empty.",
        },
      ],
    },
    StudyFieldId: {
      default: "",
      type: "string",
      rules: [
      ],
    },
    isRetired: {
      default: "",
      type: "boolean",
      rules: [
      ],
    },
    isActive: {
      default: "",
      type: "boolean",
      rules: [
      ],
    },
    StudyField: {
      default: "",
      type: "string",
      rules: [
      ],
    },
    Theses: {
      default: "",
      type: "array",
      rules: [
      ],
    },
  },
  loginUser: {
    email: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          error: "Email can't be empty.",
        },
        {
          type: "validEmail",
          error: "Not a valid email.",
        },
      ],
    },
    password: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          error: "Password can't be empty."
        }
      ],
    }
  },
  studyfield: {
    name: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          error: "Name can't be empty.",
        },
      ],
    },
  },
  councilmeeting: {
    date: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          error: "Name can't be empty.",
        },
      ],
    },
  },
};

export default schemas;
