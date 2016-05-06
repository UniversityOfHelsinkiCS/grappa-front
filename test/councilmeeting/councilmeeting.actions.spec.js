import { expect } from "chai";
import {
  COUNCILMEETING_SAVE_ONE_SUCCESS,
  COUNCILMEETING_SAVE_ONE_FAILURE,
  COUNCILMEETING_GET_ALL_SUCCESS,
  COUNCILMEETING_GET_ALL_FAILURE,
  addCouncilmeeting,
  getCouncilmeetings } from "../../src/councilmeeting/councilmeeting.actions";
import { CALL_API } from "../../src/middleware/grappaAPI";

describe("actions", () => {
  it("should create an action to add a councilmeeting", () => {
    const date = "jokupaivamaara";
    const expectedAction = {
      type: CALL_API,
      success: COUNCILMEETING_SAVE_ONE_SUCCESS,
      successMessage: {
        type: "success",
        title: "Success",
        body: "Councilmeeting was saved.",
      },
      failure: COUNCILMEETING_SAVE_ONE_FAILURE,
      method: "post",
      url: "/councilmeeting",
      data: date,
    };
    expect(expectedAction).to.deep.equal(addCouncilmeeting(date));
  });

  it("should create an action to list councilmeetings", () => {
    const date = "jokupaivamaara";
    const expectedAction = {
      type: CALL_API,
      success: COUNCILMEETING_GET_ALL_SUCCESS,
      failure: COUNCILMEETING_GET_ALL_FAILURE,
      method: "get",
      url: "/councilmeeting",
      data: date,
    };
    expect(expectedAction).to.deep.equal(getCouncilmeetings(date));
  });
});
