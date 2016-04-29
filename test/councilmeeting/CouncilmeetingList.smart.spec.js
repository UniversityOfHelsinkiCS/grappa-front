import chai, { expect } from "chai";
import jsxChai from "jsx-chai";
chai.use(jsxChai);
import sinon from "sinon";
import React from "react";
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
} from "react-addons-test-utils";
import { Provider } from "react-redux";
import store from "../../src/store";
import CouncilmeetingListContainer, { CouncilmeetingList } from "../../src/councilmeeting/CouncilmeetingList.smart";

describe("CouncilmeetingList.smart", () => {
  it("should render table headers", () => {
    const component = renderIntoDocument(
      <Provider store={store}>
        <CouncilmeetingListContainer />
      </Provider>
    );
    const title = scryRenderedDOMComponentsWithTag(component, "h2");
    expect(title.length).to.equal(2);
    expect(title[0].textContent).to.equal("Add a new date for a councilmeeting");
    expect(title[1].textContent).to.equal("Councilmeetings");
  });

  it("should call api when the page is rendered", () => {
    const spyMethod = sinon.spy();
    renderIntoDocument(
      <CouncilmeetingList councilmeetings={[]} getCouncilmeetings={spyMethod}/>
    );
    expect(spyMethod.callCount).to.be.equal(1);
  });
});
