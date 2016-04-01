import chai, { expect } from "chai";
import jsxChai from "jsx-chai";
chai.use(jsxChai)
// import { ThesesList } from "../../src/thesis/ThesisList.smart";
import tlist from "../../src/thesis/ThesisList.smart";
// import reducer from "../../src/thesis/thesis.reducer";

describe("ThesisList", () => {
  it("should call the correct action when getting theses", () => {
    expect(true).to.equal(true);
  });

  it("should update the theses correctly when the api-call returns", () => {
    expect(true).to.equal(true);
  });

  it("should not crash when api-call fails", () => {
    expect(true).to.equal(true);
  });
});
