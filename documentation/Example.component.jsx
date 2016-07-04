/**
 * Throughly documented example Component
 */

/**
 * Libraries/files to be imported to this module
 * Path starts always from this file itself
 */
import React, { Component, PropTypes } from "react";
import Nav from "../ui/Nav.container";
import FlashMessage from "../flash/FlashMessage.container";

/**
 * Sets this App-class to be the default import when you write
 * 'import AppOrWhateverYouWantToCallIt from "../documentation/Example.component"'
 * You can also set defined imports without 'default' keyword which are then imported as:
 * 'import { someMethod } from "../documentation/Example.component"'
 */
export default class App extends Component {

  /**
   * Method for rendering this Component into 'real' html
   *
   * Is the default method for creating React-components.
   * @return { DOM Element <div> } - Returns a single div
   */
  render() {
    return (
      <div>
        <h1 className="fancy-header">Gradut Pikaisesti Pakettiin</h1>
        <Nav />
        <FlashMessage />
        <main className="main-container m-top">
          {this.props.children}
        </main>
      </div>
    );
  }
}

/**
 * Required props this component needs to be rendered
 */
App.propTypes = {
  children: PropTypes.node,
};
