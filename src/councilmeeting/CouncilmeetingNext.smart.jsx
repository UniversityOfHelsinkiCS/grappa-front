import React, { Component } from "react";
import moment from "moment";

export class CouncilmeetingNext extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h2 className="ui dividing header">Councilmeeting of 1/6/2016</h2>
        <div>Total theses: 23</div>
        <div>Still in progress: 3</div>
        <div>Latest deadline for thesis: 1/5/2016</div>
        <div>Print reminder to be sent to B.Virtanen: 15/5/2016</div>
        <h3 className="ui dividing header">Theses</h3>
        <div>taulu</div>
      </div>
    );
  }
}

import { connect } from "react-redux";

export default connect()(CouncilmeetingNext);
