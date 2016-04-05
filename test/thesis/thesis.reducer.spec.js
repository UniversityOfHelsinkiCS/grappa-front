import { fromJS } from "immutable";
import { expect } from "chai";
import {
  THESIS_GET_ALL_SUCCESS,
  THESIS_GET_ALL_FAILURE,
} from "../../src/thesis/thesis.actions";
import reducer from "../../src/thesis/thesis.reducer";

const initialState = fromJS({
  theseslist: [],
});

describe("thesis.reducer", () => {
  it("should change theseslist when receiving theses", () => {
    const mockThesesFromAPI = [
      {
        id: 1,
        author: "matti meikäläinen",
        email: "matti@gmail.com",
        title: "päällikkö",
        urkund: "http://matti.com",
        ethesis: "https://ethesis.com/matti",
        abstract: "matti on mies",
        grade: "L",
      },
      {
        id: 2,
        author: "matti meikäläinen",
        email: "matti@gmail.com",
        title: "päällikkö",
        urkund: "http://matti.com",
        ethesis: "https://ethesis.com/matti",
        abstract: "matti on mies",
        grade: "L",
      },
    ];
    const expectedState = initialState.updateIn(["theseslist"],
      list => list.concat(fromJS(mockThesesFromAPI))
    );
    const newState = reducer(initialState, {
      type: THESIS_GET_ALL_SUCCESS,
      payload: mockThesesFromAPI,
    });
    // console.log("initial: ", initialState);
    // console.log("expected: ", expectedState);
    expect(newState).to.equal(expectedState);
  });

  it("shouldn't change theseslist when receiving theses produces an error", () => {
    const newState = reducer(initialState, {
      type: THESIS_GET_ALL_FAILURE,
      message: "Error message",
      error: "An error",
    });
    expect(newState).to.equal(initialState);
  });
});
