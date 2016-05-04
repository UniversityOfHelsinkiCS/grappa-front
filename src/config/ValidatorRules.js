export const validationRules = [
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
    name: "field",
    rules: [
      {
        type: "notEmpty",
        prompt: "You must choose a studyfield.",
      },
    ],
  },
  // {
  //   name: "field",
  //   rules: [
  //     {
  //       type: "notEmpty",
  //       prompt: "You must choose a studyfield."
  //     }
  //   ]
  // },
];
