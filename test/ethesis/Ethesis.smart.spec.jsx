import chai, { expect } from "chai";
import jsxChai from "jsx-chai";
chai.use(jsxChai);
import React from "react";
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
} from "react-addons-test-utils";
import { Provider } from "react-redux";
import Ethesis from "../../src/ethesis/Ethesis.smart";
import store from "../../src/store";

describe("Ethesis.smart", () => {
  const component = renderIntoDocument(
    <Provider store={store}>
      <Ethesis />
    </Provider>
  );
  it("should render a simple page", () => {
    const forms = scryRenderedDOMComponentsWithClass(component, "ethesis form");
    const header = scryRenderedDOMComponentsWithClass(component, "ui dividing header");
    expect(forms.length).to.equal(1);
    expect(header[0].textContent).to.equal("Enter eThesis link to your thesis");
  });
});
