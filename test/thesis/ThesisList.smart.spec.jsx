import chai, { expect } from "chai";
import jsxChai from "jsx-chai";
chai.use(jsxChai);
import sinon from "sinon";
import React from "react";
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  scryRenderedDOMComponentsWithClass,
} from "react-addons-test-utils";
import { Provider } from "react-redux";
import store from "../../src/store";
import ThesisListContainer, { ThesisList } from "../../src/thesis/ThesisList.smart";

describe("ThesisList.smart", () => {
  it("should render table headers", () => {
    const component = renderIntoDocument(
      <Provider store={store}>
        <ThesisListContainer />
      </Provider>
    );
    const title = scryRenderedDOMComponentsWithTag(component, "h2");
    expect(title.length).to.equal(1);
    expect(title[0].textContent).to.equal("Theses");
  });

  it("should call api when the page is rendered", () => {
    const spyMethod = sinon.spy();
    renderIntoDocument(
      <ThesisList theses={[]} getTheses={spyMethod}/>
    );
    expect(spyMethod.callCount).to.be.equal(1);
  });

  it("should render filter dropdown", () => {
    const component = renderIntoDocument(
      <Provider store={store}>
        <ThesisListContainer />
      </Provider>
    );
    const select = scryRenderedDOMComponentsWithClass(component, "select-filter");
    expect(select.length).to.equal(1);
    console.log(select[0]);
    expect(select[0].textContent).to.equal("Select Status...DoneIn progress");
  });
});
