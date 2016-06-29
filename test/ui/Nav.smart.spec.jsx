import chai, { expect } from "chai";
import jsxChai from "jsx-chai";
chai.use(jsxChai);
import sinon from "sinon";
import React from "react";
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate,
} from "react-addons-test-utils";
import { Provider } from "react-redux";
import store from "../../src/store";
import { logout } from "../../src/auth/auth.actions";
import Nav from "../../src/ui/Nav.smart";

describe("Nav.smart", () => {
  const component = renderIntoDocument(
    <Provider store={store}>
      <Nav />
    </Provider>
  );
  xit("should call logout() when logout button is clicked", () => {
    const button = scryRenderedDOMComponentsWithTag(component, "a")[0];

    const spy = sinon.spy(logout);
    Simulate.click(button);
    setTimeout(() => {
      expect(spy.calledOnce).to.equal(true);
    }, 1);
  });
});
