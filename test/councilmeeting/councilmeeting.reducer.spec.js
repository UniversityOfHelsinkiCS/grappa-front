import { expect } from "chai";
import { fromJS } from "immutable";
import reducer from "../../src/councilmeeting/councilmeeting.reducer";
import {
  COUNCILMEETING_SAVE_ONE_SUCCESS,
  COUNCILMEETING_SAVE_ONE_FAILURE,
  COUNCILMEETING_GET_ALL_SUCCESS,
  COUNCILMEETING_GET_ALL_FAILURE,
} from "../../src/councilmeeting/councilmeeting.actions";
import { councilmeeting, councilmeetings } from "../mockdata";

const initialState = fromJS({
  councilmeetings: [],
});
const stateWithCMeetings = fromJS({
  councilmeetings,
});
const stateWithMoreCMeetings = fromJS({
  councilmeetings: [...councilmeetings, councilmeeting],
});

describe("councilmeeting reducer", () => {
  it("should return the default state when unknown action", () => {
    const newState = reducer(initialState, {
      type: null,
    });
    expect(newState).to.equal(initialState);
  });

  it("should change councilmeetings when receiving dates", () => {
    const newState = reducer(initialState, {
      type: COUNCILMEETING_GET_ALL_SUCCESS,
      payload: councilmeetings,
    });
    expect(newState).to.equal(stateWithCMeetings);
  });

  it("shouldn't change councilmeetings when receiving dates produces an error", () => {
    const newState = reducer(initialState, {
      type: COUNCILMEETING_GET_ALL_FAILURE,
      message: "vituix men",
      error: "lol",
    });
    expect(newState).to.equal(initialState);
  });

  it("should add councilmeeting to councilmeetings when saving succesfull", () => {
    const expectedState = initialState.mergeIn(["councilmeetings"],
      fromJS([councilmeeting])
    );
    const newState = reducer(initialState, {
      type: COUNCILMEETING_SAVE_ONE_SUCCESS,
      payload: councilmeeting,
    });
    expect(newState).to.equal(expectedState);
  });

  it("shouldn't remove old dates when adding councilmeeting", () => {
    const newState = reducer(stateWithCMeetings, {
      type: COUNCILMEETING_SAVE_ONE_SUCCESS,
      payload: councilmeeting,
    });
    expect(newState).to.equal(stateWithMoreCMeetings);
  });

  it("shouldn't change councilmeetings when saving councilmeeting fails", () => {
    const newState = reducer(initialState, {
      type: COUNCILMEETING_SAVE_ONE_FAILURE,
      message: "heh",
      error: "can't take yo shit anymore",
    });
    expect(newState).to.equal(initialState);
  });
});
