import React, { Component } from "react";

export class FlashMessage extends Component {

  handleClick(message, event) {
    event.preventDefault();
    this.props.hideMessage(message.id);
  }

  renderMessage(message) {
    return (
      <div key={message.id} className={`ui ${message.type} message`}>
        <i className="close icon" onClick={this.handleClick.bind(this, message)}></i>
        <div className="header">
          { message.title }
        </div>
        <p>{ message.body }</p>
      </div>
    );
  }

        // <div className="ui info message">
        //   <span style={{ "marginRight": "10px" }}>
        //     Show all
        //   </span>
        //   <i className="arrow down icon" onClick={this.handleClick.bind(this, "displayMsgLog")}></i>
        // </div>

  render() {
    const { showable } = this.props;
    const lastFour = showable.slice(showable.length - 4);
    return (
      <div className="flashmessage-container">
        { lastFour.map(msg => this.renderMessage(msg)) }
      </div>
    );
  }
}

import { connect } from "react-redux";
import { hideMessage } from "./flash.actions";

const mapStateToProps = (state) => {
  const flash_r = state.get("flash");
  return {
    messages: flash_r.get("messages").toJS(),
    showable: flash_r.get("showableMessages").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  hideMessage(id) {
    dispatch(hideMessage(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage);
