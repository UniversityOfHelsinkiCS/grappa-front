import { expect } from "chai";
import { CALL_API } from "../../src/middleware/grappaAPI";
import {
  THESIS_GET_ALL_SUCCESS,
  THESIS_GET_ALL_FAILURE,
  THESIS_SAVE_ONE_SUCCESS,
  THESIS_SAVE_ONE_FAILURE,
  THESIS_UPDATE_ONE_SUCCESS,
  THESIS_UPDATE_ONE_FAILURE,
  saveThesis,
  getTheses,
  updateThesisWithEthesis,
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

  it("saveThesis should return correct object", () => {
    const newThesis = {
      id: 1,
      author: "matti meikäläinen",
      email: "matti@gmail.com",
      title: "päällikkö",
      urkund: "http://matti.com",
      ethesis: "https://ethesis.com/matti",
      abstract: "matti on mies",
      grade: "L",
    };
    const createdAction = saveThesis(newThesis);
    const expectedAction = {
      type: CALL_API,
      success: THESIS_SAVE_ONE_SUCCESS,
      failure: THESIS_SAVE_ONE_FAILURE,
      method: "post",
      url: "/thesis",
      data: newThesis,
    };
    expect(createdAction).to.deep.equal(expectedAction);
  });

  it("updateThesisWithEthesis should return correct object", () => {
    const updateInfo = {
      ethesis: "http://google.com",
    };
    const createdAction = updateThesisWithEthesis(updateInfo);
    const expectedAction = {
      type: CALL_API,
      success: THESIS_UPDATE_ONE_SUCCESS,
      failure: THESIS_UPDATE_ONE_FAILURE,
      method: "post",
      url: "/thesis/ethesis",
      data: updateInfo,
    };
    expect(createdAction).to.deep.equal(expectedAction);
  });
});
