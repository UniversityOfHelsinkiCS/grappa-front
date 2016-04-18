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
import { logout } from "../../src/login/login.actions";
import Navi from "../../src/ui/Navi.component";

describe("Navi.component", () => {
  const component = renderIntoDocument(
    <Provider store={store}>
      <Navi />
    </Provider>
  );
  it("should call logout method when proper button is clicked", () => {
    const button = scryRenderedDOMComponentsWithClass(component, "item")[1];

    const spy = sinon.spy(logout);
    Simulate.click(button);
    setTimeout(() => {
      expect(spy.calledOnce).to.equal(true);
    }, 1);
  });
});
