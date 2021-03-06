import chai, { expect } from "chai"; import jsxChai from "jsx-chai"; chai.use(jsxChai);
import React from "react";
import sinon from "sinon";
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate,
} from "react-addons-test-utils";
import { Provider } from "react-redux";
import Ethesis from "../../src/ethesis/Ethesis";
import store from "../../src/store";
import * as actions from "../../src/thesis/thesis.actions";

describe("Ethesis", () => {
  const component = renderIntoDocument(
    <Provider store={store}>
      <Ethesis params=""/>
    </Provider>
  );
  const form = scryRenderedDOMComponentsWithClass(component, "ethesis form")[0];
  xit("should render a simple page", () => {
    const forms = scryRenderedDOMComponentsWithClass(component, "ethesis form");
    const header = scryRenderedDOMComponentsWithClass(component, "ui dividing header");
    expect(forms.length).to.equal(1);
    expect(header[0].textContent).to.equal("Enter eThesis link to your thesis");
  });
  xit("should call updateThesisWithEthesis when submit button is clicked", () => {
    const spy = sinon.spy(actions, "updateThesisWithEthesis");
    Simulate.submit(form);
    expect(spy.calledOnce).to.equal(true);
  });
});
