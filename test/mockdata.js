export const studyfields = [
  {
    name: "Studyfield 1",
  },
  {
    name: "Studyfield 2",
  },
];

export const users = [
  {
    id: 1,
    name: "Kjell Lemström",
    password: "asdf",
    email: "ohtugrappa@gmail.com",
    role: "admin",
    isActive: true,
    StudyFieldId: null,
  },
  {
    id: 2,
    name: "B Virtanen",
    password: "asdf",
    email: "ohtugrappa2@gmail.com",
    role: "print-person",
    isActive: false,
    StudyFieldId: null,
  },
  {
    id: 3,
    name: "Tohtori Sykerö",
    password: "asdf",
    email: "ohtugrappa3@gmail.com",
    role: "professor",
    isActive: false,
    StudyFieldId: 1,
  },
  {
    id: 4,
    name: "Tohtori Outolempi",
    password: "asdf",
    email: "ohtugrappa4@gmail.com",
    role: "professor",
    isActive: false,
    StudyFieldId: 2,
  },
  {
    id: 5,
    name: "Alikersantti Rokka",
    password: "asdf",
    email: "ohtugrappa5@gmail.com",
    role: "instructor",
    isActive: false,
    StudyFieldId: 1,
  },
  {
    id: 6,
    name: "Vänrikki Koskela",
    password: "asdf",
    email: "ohtugrappa6@gmail.com",
    role: "instructor",
    isActive: false,
    StudyFieldId: 2,
  },
];

export const notActivatedUsers = [
  {
    id: 2,
    name: "B Virtanen",
    password: "asdf",
    email: "ohtugrappa2@gmail.com",
    role: "print-person",
    isActive: false,
    StudyFieldId: null,
  },
  {
    id: 3,
    name: "Tohtori Sykerö",
    password: "asdf",
    email: "ohtugrappa3@gmail.com",
    role: "professor",
    isActive: false,
    StudyFieldId: 1,
  },
  {
    id: 4,
    name: "Tohtori Outolempi",
    password: "asdf",
    email: "ohtugrappa4@gmail.com",
    role: "professor",
    isActive: false,
    StudyFieldId: 2,
  },
  {
    id: 5,
    name: "Alikersantti Rokka",
    password: "asdf",
    email: "ohtugrappa5@gmail.com",
    role: "instructor",
    isActive: false,
    StudyFieldId: 1,
  },
  {
    id: 6,
    name: "Vänrikki Koskela",
    password: "asdf",
    email: "ohtugrappa6@gmail.com",
    role: "instructor",
    isActive: false,
    StudyFieldId: 2,
  },
];

export const thesisProgresses = [
  {
    StudentRegistrationNotification: null,
  },
  {
    StudentRegistrationNotification: {},
  }
];

export const thesis = {
  id: 3,
  author: "EKA GRADU",
  email: "spam@gmail.com",
  title: "ihminen",
  grader: "Masa",
  grader2: "Pena",
  graderemail: "masa@gmail.com",
  grader2email: "pena@hotmail.com",
  gradertitle: "Professor",
  grader2title: "Assistant Professor",
  urkund: "https://urkund.com/plagioitulol",
  ethesis: "https://ethesis.com/teemu",
  abstract: "Hauki on kala",
  field: "Data science",
  grade: "Approbatur",
  deadline: "29.2.2020",
};

export const theses = [
  {
    id: 2,
    author: "TOKA GRADU",
    User: users[1],
    StudyField: studyfields[0],
    email: "matti@gmail.com",
    title: "päällikkö",
    urkund: "http://matti.com",
    ethesis: "https://ethesis.com/matti",
    abstract: "matti on mies",
    grade: "L",
    CouncilMeetingId: 2,
    ThesisProgress: thesisProgresses[0],
  },
  {
    id: 3,
    author: "KOLMAS GRADU",
    User: users[1],
    StudyField: studyfields[0],
    email: "matti@gmail.com",
    title: "päällikkö",
    urkund: "http://matti.com",
    ethesis: "https://ethesis.com/matti",
    abstract: "matti on mies",
    grade: "L",
    CouncilMeetingId: 2,
    ThesisProgress: thesisProgresses[0],
  },
  {
    id: 4,
    author: "NELJÄS GRADU",
    User: users[1],
    StudyField: studyfields[0],
    email: "matti@gmail.com",
    title: "päällikkö",
    urkund: "http://matti.com",
    ethesis: "https://ethesis.com/matti",
    abstract: "matti on mies",
    grade: "L",
    CouncilMeetingId: 3,
    ThesisProgress: thesisProgresses[1],
  },
];

export const councilmeetings = [
  {
    id: 1,
    date: "date1",
  },
  {
    id: 2,
    date: "date2",
  },
  {
    id: 3,
    date: "date3",
  },
];

export const activatedUsers = [
  {
    id: 2,
    name: "B Virtanen",
    password: "asdf",
    email: "ohtugrappa2@gmail.com",
    role: "print-person",
    isActive: true,
    StudyFieldId: null,
  },
  {
    id: 3,
    name: "Tohtori Sykerö",
    password: "asdf",
    email: "ohtugrappa3@gmail.com",
    role: "professor",
    isActive: true,
    StudyFieldId: 1,
  },
  {
    id: 4,
    name: "Tohtori Outolempi",
    password: "asdf",
    email: "ohtugrappa4@gmail.com",
    role: "professor",
    isActive: true,
    StudyFieldId: 2,
  },
  {
    id: 5,
    name: "Alikersantti Rokka",
    password: "asdf",
    email: "ohtugrappa5@gmail.com",
    role: "instructor",
    isActive: true,
    StudyFieldId: 1,
  },
  {
    id: 6,
    name: "Vänrikki Koskela",
    password: "asdf",
    email: "ohtugrappa6@gmail.com",
    role: "instructor",
    isActive: true,
    StudyFieldId: 2,
  },
];

export const loggedInUsers = [
  {
    id: 1,
    name: "Kjell Lemström",
    email: "ohtugrappa@gmail.com",
    role: "admin",
    StudyFieldId: null,
  },
  {
    id: 2,
    name: "B Virtanen",
    email: "ohtugrappa2@gmail.com",
    role: "print-person",
    StudyFieldId: null,
  },
];

export const tokens = [
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoxLCJyb2xlIjoiYWRtaW4iLCJTdHVkeUZpZWxkSWQiOm51bGx9LCJjcmVhdGVkIjoiMjAxNi0wNS0xMVQxODowMDo0MC40NzJaIiwiZXhwaXJlcyI6MTQ2Mjk4OTY0MDQ3Mn0.fAr3zUXgirdQT3YpVQa2DkLZR-4i1E2TJl-UOYGH0RE",
];
