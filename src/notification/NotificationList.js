import React, { Component } from "react";
import moment from "moment";
import Validate from "../validate/Validate";
import ValidateError from "../ui/Error";

export class NotificationList extends Component {

  componentWillMount() {
    this.props.getNotifications();
  }

  componentWillUnmount() {
    // set notifications read here?
    // otherwise have to listen window.focus 
    // maybe also for willMount as 
    this.setCurrentNotificationsRead();
  }

  handleChange(formname, field, event) {
    // if (formname === "newNotification") {
    //   Validate.updateForm("newNotification", field, event.target.value);
    // } else if (formname === "updateNotification") {
    //   let value;
    //   if (field === "isActive") {
    //     value = !Validate.getFormField("updateNotification", field);
    //   } else {
    //     value = event.target.value;
    //   }
    //   Validate.updateForm("updateNotification", field, value);
    // }
  }

  setCurrentNotificationsRead() {
    let ids = [];
    for (let i = 0; i < this.props.Notifications.length; i++) {
      // if (this.props.Notifications[i].hasBeenRead) {
      //   break;
      // }
      ids.push(this.props.Notifications[i].id);
    }
    this.props.setNotificationsRead(ids);
  }

  handleClick(type, index, event) {
    if (type === "setRead") {
      this.setCurrentNotificationsRead();
    }
  }

  render() {
    const { Notifications } = this.props;
    return (
      <div className="ui form">
        <div className="field">
          <h2 className="ui dividing header">Notifications</h2>
          <p>
            Every action by users other than you are logged into database as notifications.
            They are updated automatically and refresh without you having to update this page.
            Visiting this page will set them read and they are removed from the database after 30 days since their creation.
          </p>
          <button className="ui orange button" onClick={this.handleClick.bind(this, "setRead")}>
            Mark all as read
          </button>
          <table className="ui celled table">
            <thead>
              <tr>
                <th onClick={this.handleClick.bind(this, "sort", "status")}>Read</th>
                <th onClick={this.handleClick.bind(this, "sort", "status")}>Created</th>
                <th onClick={this.handleClick.bind(this, "sort", "authorFirstname")}>Type</th>
                <th onClick={this.handleClick.bind(this, "sort", "authorLastname")}>Content</th>
              </tr>
            </thead>
            <tbody>
              { Notifications.map((item, index) =>
                <tr key={index} onClick={this.handleClick.bind(this, "selectField", index)}>
                  <td>
                    { item.hasBeenRead ? <i className="check square icon green grappa-icon"></i> : <i></i> }
                  </td>
                  <td>{`${moment(item.createdAt).format("HH:mm DD/MM/YYYY")}`}</td>
                  <td>{item.type}</td>
                  <td>{item.content}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
import { connect } from "react-redux";
import { getNotifications, setNotificationsRead } from "notification/notification.actions";

const mapStateToProps = (state) => {
  const notification_r = state.get("notification");
  return {
    Notifications: notification_r.get("notifications").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  getNotifications() {
    dispatch(getNotifications());
  },
  setNotificationsRead(data) {
    dispatch(setNotificationsRead(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList);
