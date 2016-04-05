import { expect } from "chai";
import { COUNCILMEETING_SAVE_ONE_SUCCESS,
         COUNCILMEETING_SAVE_ONE_FAILURE,
         COUNCILMEETING_GET_ALL_SUCCESS,
         COUNCILMEETING_GET_ALL_FAILURE } from "../../src/councilmeeting/Councilmeeting.actions";

import { addCouncilmeeting,
         listCouncilmeetings } from "../../src/councilmeeting/Councilmeeting.actions";
import { CALL_API } from "../../src/middleware/grappaAPI";

describe("actions", () => {
  it("should create an action to add a councilmeeting", () => {
    const date = "jokupaivamaara";
    const expectedAction = {
      type: CALL_API,
      success: COUNCILMEETING_SAVE_ONE_SUCCESS,
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
    expect(expectedAction).to.deep.equal(listCouncilmeetings(date));
  });
});
