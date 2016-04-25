import chai, { expect } from "chai"; import jsxChai from "jsx-chai"; chai.use(jsxChai);
import React from "react";
import sinon from "sinon";
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate,
} from "react-addons-test-utils";
import { Provider } from "react-redux";
import Ethesis from "../../src/ethesis/Ethesis.smart";
import store from "../../src/store";
import * as actions from "../../src/thesis/thesis.actions";

describe("Ethesis.smart", () => {
  const component = renderIntoDocument(
    <Provider store={store}>
      <Ethesis params=""/>
    </Provider>
  );
  const form = scryRenderedDOMComponentsWithClass(component, "ethesis form")[0];
  it("should render a simple page", () => {
    const forms = scryRenderedDOMComponentsWithClass(component, "ethesis form");
    const header = scryRenderedDOMComponentsWithClass(component, "ui dividing header");
    expect(forms.length).to.equal(1);
    expect(header[0].textContent).to.equal("Enter eThesis link to your thesis");
  });
  it("should call updateThesis when submit button is clicked", () => {
    const spy = sinon.spy(actions, "updateThesis");
    Simulate.submit(form);
    expect(spy.calledOnce).to.equal(true);
  });
});
