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
import ThesisListContainer, { ThesisListPage } from "../../src/thesis/ThesisListPage";

describe("ThesisListPage.smart", () => {
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
      <ThesisListPage theses={[]} getTheses={spyMethod}/>
    );
    expect(spyMethod.callCount).to.be.equal(1);
  });

  xit("should render filter checkbox", () => {
    const component = renderIntoDocument(
      <Provider store={store}>
        <ThesisListContainer />
      </Provider>
    );
    const select = scryRenderedDOMComponentsWithClass(component, "checkbox");
    expect(select.length).to.equal(1);
  });
});
