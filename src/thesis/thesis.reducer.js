import { fromJS } from "immutable";

import {
  THESIS_GET_ALL_SUCCESS,
  // THESIS_GET_ALL_FAILURE,
  THESIS_RESET_ALL_REQUEST,
  THESIS_SAVE_ONE_REQUEST,
  THESIS_SAVE_ONE_SUCCESS,
  THESIS_SAVE_ONE_FAILURE,
} from "./thesis.actions";

const INITIAL_STATE = fromJS({
  theseslist: [
    {},
    /*{
      id: 1,

      author: "Matti Meikäläinen",
      email: "matti@gmail.com",
      title: "Matoalgebra",
      instructor: "Pekka Pouta",
      urkund: "http://matti.com",
      ethesis: "https://ethesis.com/matti",
      abstract: "Matti on mies",
      field: "Haja",
      grade: "L",
      deadline: "07.07.2016",
    },
    {
      id: 2,

      author: "Vesa Keskinen",

      email: "vesa@gmail.com",
      title: "Lumen sulaminen",
      instructor: "Ilmari Suomalainen",
      urkund: "http://vesa.com",
      ethesis: "https://ethesis.com/vesa",
      abstract: "Vesalla on ferrari",
      field: "Bio",
      grade: "A",
      deadline: "16.01.2017",
    },
    {
      id: 3,

      author: "urho kekkonen",

      author: "Batman",
      email: "bat@lair.com",
      title: "Im BATMAN",
      instructor: "Michael Bay",
      urkund: "http://youtube.com",
      ethesis: "https://ethesis.com/batman",
      abstract: "Lepakkoja vaikka muille jakaa",
      field: "Bio",
      grade: "L",
      deadline: "16.01.2267",
    },
    {
      id: 4,
      author: "Urho Kalevi",

      email: "urkki@gmail.com",
      title: "Kekkosen vanhuus",
      instructor: "Kyösti Kallio",
      urkund: "http://urkki.com",
      ethesis: "https://ethesis.com/urkki",
      abstract: "Urkki on jo kuollut heh",
      grade: "E",
      deadline: "09.12.2016",
    }, */
  ],
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case THESIS_GET_ALL_SUCCESS:
      return state.merge({
        theseslist: action.payload,
      });
    case THESIS_RESET_ALL_REQUEST:
      return state.merge(INITIAL_STATE);
    case THESIS_SAVE_ONE_REQUEST:
      return state.merge({
        theseslist: state.get("theseslist").push(
          action.body
        ),
      });
    case THESIS_SAVE_ONE_SUCCESS:
      return state.merge().theseslist.push(action.payload);
    default:
      return state;
  }
}
