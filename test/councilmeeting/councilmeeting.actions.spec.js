import { expect } from "chai";
import { COUNCILMEETING_SAVE_ONE_SUCCESS } from "../../src/councilmeeting/Councilmeeting.actions";
import { COUNCILMEETING_SAVE_ONE_FAILURE } from "../../src/councilmeeting/Councilmeeting.actions";

import { addCouncilmeeting } from "../../src/councilmeeting/Councilmeeting.actions";
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
});
