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
      model: "grader",
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
};

export default schemas;