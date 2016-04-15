import chai, { expect } from "chai";
import jsxChai from "jsx-chai";
chai.use(jsxChai);
import sinon from "sinon";
import React from "react";
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate,
} from "react-addons-test-utils";
import { Provider } from "react-redux";
import store from "../../src/store";
import ThesisCreateContainer from "../../src/thesis/ThesisCreate.smart";
import { saveThesis } from "../../src/thesis/thesis.actions";

describe("ThesisCreate.smart", () => {
  const component = renderIntoDocument(
    <Provider store={store}>
      <ThesisCreateContainer />
    </Provider>
  );
  it("should render the page", () => {
    const title = scryRenderedDOMComponentsWithClass(component, "ui dividing header");
    expect(title.length).to.equal(4);
    expect(title[0].textContent).to.equal("Made by");
  });

  it("should call method saveThesis when submit is clicked", () => {
    const button = scryRenderedDOMComponentsWithClass(component, "ui primary button")[1];

    const spy = sinon.spy(saveThesis);
    Simulate.click(button);
    setTimeout(() => {
      expect(spy.calledOnce).to.equal(true);
    }, 1);
  });

  describe("ThesisCreate form validation", () => {
    const button = scryRenderedDOMComponentsWithClass(component, "ui primary button")[1];
    it("should keep submit button locked until all fields are filled", () => {
      expect(button.disabled).to.equal(true);
    });
  });
});
