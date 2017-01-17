import React, { Component } from "react";

export class NotificationIconBox extends Component {

  render() {
    const { Notifications } = this.props;
    return (
      <span>
        { Notifications.length }<i className="alarm icon"></i>
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
