import { expect } from "chai";
import { CALL_API } from "../../src/middleware/grappaAPI";
import {
  THESIS_GET_ALL_SUCCESS,
  THESIS_GET_ALL_FAILURE,
  getTheses,
} from "../../src/thesis/thesis.actions";

describe("thesis.actions", () => {
  it("getTheses should return correct object", () => {
    const createdAction = getTheses();
    const expectedAction = {
      type: CALL_API,
      success: THESIS_GET_ALL_SUCCESS,
      failure: THESIS_GET_ALL_FAILURE,
      method: "get",
      url: "/thesis",
      data: {},
    };
    expect(createdAction).to.deep.equal(expectedAction);
  });
});
