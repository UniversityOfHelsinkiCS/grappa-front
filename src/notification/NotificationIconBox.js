import React, { Component } from "react";

export class NotificationIconBox extends Component {

  countUnread() {
    return this.props.Notifications.reduce((acc, cur) => {
      if (!cur.hasBeenRead) {
        acc += 1;
      }
      return acc;
    }, 0)
  }

  render() {
    const { Notifications } = this.props;
    const count = this.countUnread();
    return (
      <span>
        { count }<i className={ count === 0 ? "alarm outline icon" : "alarm icon"}></i>
      </span>
    );
  }
}
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  const notification_r = state.get("notification");
  return {
    Notifications: notification_r.get("notifications").toJS(),
  };
};

export default connect(mapStateToProps, null)(NotificationIconBox);
