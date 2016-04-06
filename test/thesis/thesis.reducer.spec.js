import { fromJS } from "immutable";
import { expect } from "chai";
import {
  THESIS_GET_ALL_SUCCESS,
  THESIS_GET_ALL_FAILURE,
  THESIS_SAVE_ONE_SUCCESS,
  THESIS_SAVE_ONE_FAILURE,
} from "../../src/thesis/thesis.actions";
import reducer from "../../src/thesis/thesis.reducer";
import { thesis, theses } from "../mockdata";

const initialState = fromJS({
  theseslist: [],
});
const stateWithTheses = fromJS({
  theseslist: theses,
});
const stateWithMoreTheses = fromJS({
  theseslist: [...theses, thesis],
});

describe("thesis.reducer", () => {
  it("should change theseslist when receiving theses", () => {
    const newState = reducer(initialState, {
      type: THESIS_GET_ALL_SUCCESS,
      payload: theses,
    });
    expect(newState).to.equal(stateWithTheses);
  });

  it("shouldn't change theseslist when receiving theses produces an error", () => {
    const newState = reducer(initialState, {
      type: THESIS_GET_ALL_FAILURE,
      message: "Error message",
      error: "An error",
    });
    expect(newState).to.equal(initialState);
  });

  it("should add thesis to theseslist when saving thesis is succesfull", () => {
    const expectedState = initialState.mergeIn(["theseslist"],
      fromJS([thesis])
    );
    const newState = reducer(initialState, {
      type: THESIS_SAVE_ONE_SUCCESS,
      payload: thesis,
    });
    expect(newState).to.equal(expectedState);
  });

  it("shouldn't remove old theses when adding thesis", () => {
    const newState = reducer(stateWithTheses, {
      type: THESIS_SAVE_ONE_SUCCESS,
      payload: thesis,
    });
    expect(newState).to.equal(stateWithMoreTheses);
  });

  it("shouldn't change theses when saving is unsuccesfull", () => {
    const newState = reducer(initialState, {
      type: THESIS_SAVE_ONE_FAILURE,
      message: "asdf",
      error: "error",
    });
    expect(newState).to.equal(initialState);
  });
});
