import React, { Component } from "react";

export class FlashMessage extends Component {

  constructor() {
    super();
    this.handleMessageClose = this.handleMessageClose.bind(this);
    this.state = {
      timer: "",
    }
  }

  handleMessageClose(message, event) {
    event.preventDefault();
    this.props.deleteMessage(message.id);
  }

  renderMessage(message) {
    return (
      <div className={`ui ${message.type} message`}>
        <i className="close icon" onClick={this.handleMessageClose.bind(this, message)}></i>
        <div className="header">
          { message.title }
        </div>
        <p>{ message.body }</p>
      </div>
    );
  }

  render() {
    const { messages } = this.props;
    return(
      <div className="flashmessage-container">
        messageita on: { messages.length }
        { messages.map(msg => this.renderMessage(msg)) }
      </div>
    );
  }
}

import { connect } from "react-redux";
import { deleteMessage } from "./flash.actions";

const mapStateToProps = (state) => {
  const freducer = state.get("flash");
  return {
    messages: freducer.get("messages").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteMessage(id) {
    dispatch(deleteMessage(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage);
