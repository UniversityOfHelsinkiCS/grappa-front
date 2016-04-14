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
import LoginContainer from "../../src/login/Login.smart";

describe("Login.smart", () => {
  const component = renderIntoDocument(
    <Provider store={store}>
      <LoginContainer />
    </Provider>
  );
  it("should render page", () => {
    const buttons = scryRenderedDOMComponentsWithClass(component, "ui primary button");
    expect(buttons.length).to.equal(1);
    expect(buttons[0].value).to.equal("Submit");
  });


    it("validation should keep submit button locked until all fields are filled", () => {
      const button = scryRenderedDOMComponentsWithClass(component, "ui primary button")[0];
      expect(button.disabled).to.equal(true);
    });
})
