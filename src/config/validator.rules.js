const validationRules = {
  thesis: [
    {
      name: "fname",
      rules: [
        {
          type: "notEmpty",
          prompt: "First name can't be empty.",
        },
      ],
    },
    {
      name: "lname",
      rules: [
        {
          type: "notEmpty",
          prompt: "Last name can't be empty.",
        },
      ],
    },
    {
      name: "email",
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
    {
      name: "title",
      rules: [
        {
          type: "notEmpty",
          prompt: "Title can't be empty.",
        },
      ],
    },
    {
      name: "StudyFieldName",
      rules: [
        {
          type: "notEmpty",
          prompt: "You must choose a studyfield.",
        },
      ],
    },
    {
      name: "grade",
      rules: [
        {
          type: "notEmpty",
          prompt: "You must choose a grade.",
        },
      ],
    },
    {
      name: "graders",
      model: "grader",
      rules: [
        {
          type: "minCount[2]",
          prompt: "You must have at least two graders.",
        },
      ],
    },
    {
      name: "CouncilMeetingId",
      rules: [
        {
          type: "notEmpty",
          prompt: "You must choose a council meeting.",
        },
      ],
    },
  ],
  grader: [
    {
      name: "name",
      rules: [
        {
          type: "notEmpty",
          prompt: "Grader name can't be empty.",
        },
      ],
    },
    {
      name: "title",
      rules: [
        {
          type: "notEmpty",
          prompt: "Grader title can't be empty.",
        },
      ],
    },
  ],
  registration: [
    {
      name: "fname",
      rules: [
        {
          type: "notEmpty",
          prompt: "First name can't be empty.",
        },
      ],
    },
    {
      name: "lname",
      rules: [
        {
          type: "notEmpty",
          prompt: "Last name can't be empty.",
        },
      ],
    },
    {
      name: "email",
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
    {
      name: "password",
      rules: [
        {
          type: "notEmpty",
          prompt: "Title can't be empty.",
        },
      ],
    },
  ]
};

export default validationRules;
