import React, { Component } from "react";

export default class Introduction extends Component {

  render() {
    return (
      <div id="front-page" className="ui center aligned container">
        <div className="ui stripe theming vertical segment grappa-segment">
          <div className="ui stackable very relaxed grid container">
            <div className="center aligned column">
              <h1 className="ui icon header grappa-header">Introduction to Grappa</h1>
              <p>
                Grappa was made for the University of Helsinki's department of Computer Science
                to administer the process of accepting theses which includes sending emails back
                and forth and keeping all the documents in check.
                Its purpose is to easen and simplify the process and make it easier for
                everyone involved.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
