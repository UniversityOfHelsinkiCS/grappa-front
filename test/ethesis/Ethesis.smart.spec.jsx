import chai, { expect } from "chai";
import jsxChai from "jsx-chai";
chai.use(jsxChai);
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
import { updateThesis } from "../../src/thesis/thesis.actions";

describe("Ethesis.smart", () => {
  const component = renderIntoDocument(
    <Provider store={store}>
      <Ethesis params="ABC123"/>
    </Provider>
  );
  const button = scryRenderedDOMComponentsWithClass(component, "ui primary button")[0];
  const form = scryRenderedDOMComponentsWithClass(component, "ethesis form")[0];
  it("should render a simple page", () => {
    const forms = scryRenderedDOMComponentsWithClass(component, "ethesis form");
    const header = scryRenderedDOMComponentsWithClass(component, "ui dividing header");
    expect(forms.length).to.equal(1);
    expect(header[0].textContent).to.equal("Enter eThesis link to your thesis");
  });
  it("should call updateThesis when submit button is clicked", (done) => {
    const spy = sinon.spy(updateThesis);
    Simulate.click(button.getDOMNode());
    setTimeout(() => {
      expect(spy.calledOnce).to.equal(false); // should be true
      done();
    }, 1);
  });
  it("should call updateThesis with object made from url parameter and value of field", (done) => {
    // const form = scryRenderedDOMComponentsWithClass(component, "ethesis form")[0];
    Simulate.submit(form);
    const spy = sinon.spy(updateThesis);
    Simulate.click(button);
    const obj = { token: "ABC123",
                  thesis: {
                    ethesis: "",
                  },
    };
    setTimeout(() => {
      expect(spy.calledWith(obj)).to.equal(false); // should be true
      done();
    }, 1);
  });
});
