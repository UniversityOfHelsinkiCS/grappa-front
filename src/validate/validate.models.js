// export const models = {
//   thesis: {
//     authorFirstname: "",
//     authorLastname: "",
//     authorEmail: "",
//     title: "",
//     Graders: [],
//     urkund: "",
//     grade: "",
//     StudyFieldId: "",
//     CouncilMeetingId: "",
//     PdfFile: "",
//   },
//   grader: {
//     name: "",
//     title: "",
//   },
//   councilmeeting: {
//     date: "",
//   },
//   user: {
//     email: "",
//     password: "",
//     passwordConf: "",
//   }
// }

const modelsWithRules = {
  thesis: {
    authorFirstname: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          prompt: "First name can't be empty.",
        },
      ],
    },
    authorLastname: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          prompt: "First name can't be empty.",
        },
      ],
    },
    authorEmail: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          prompt: "Email can't be empty.",
        },
        {
          type: "validEmail",
          prompt: "Not a valid email.",
        },
      ],
    },
    title: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          prompt: "Title can't be empty.",
        },
      ],
    },
    urkund: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          prompt: "Urkund link can't be empty.",
        },
        {
          type: "isLink",
          prompt: "Urkund link isn't a valid link.",
        },
      ],
    },
    grade: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          prompt: "You must choose a grade.",
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
          prompt: "You must have at least two graders.",
        },
      ],
    },
    StudyFieldId: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          prompt: "You must choose a studyfield.",
        },
      ],
    },
    CouncilMeetingId: {
      default: "",
      type: "string",
      rules: [
        {
          type: "notEmpty",
          prompt: "You must choose a council meeting.",
        },
      ],
    },
    PdfFile: {
      default: "",
      type: "file",
      rules: [
        {
          type: "notEmpty",
          prompt: "You must upload a review.",
        },
      ],
    },
  },
};

export default modelsWithRules;
