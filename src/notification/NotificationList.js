import React, { Component } from "react";
import Validate from "../validate/Validate";
import ValidateError from "../ui/Error.component";

export class NotificationList extends Component {

  componentWillMount() {
    this.props.getNotifications();
  }

  componentWillUnmount() {
    // set notifications read here?
    // otherwise have to listen window.focus 
    // maybe also for willMount as 
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

  handleClick(type, index, event) {
    // if (type === "save" && Validate.isFormValid("newNotification")) {
    //   this.props.saveNotification(this.state.newNotification.values);
    // } else if (type === "update" && this.state.updateNotification.values.id && Validate.isFormValid("updateNotification")) {
    //   this.props.updateNotification(this.state.updateNotification.values);
    // } else if (type === "selectField") {
    //   Validate.replaceForm("updateNotification", this.props.Notifications[index]);
    // }
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
          <table className="ui celled table">
            <thead>
              <tr>
                <th onClick={this.handleClick.bind(this, "sort", "status")}>Created</th>
                <th onClick={this.handleClick.bind(this, "sort", "authorFirstname")}>Type</th>
                <th onClick={this.handleClick.bind(this, "sort", "authorLastname")}>Content</th>
              </tr>
            </thead>
            <tbody>
              { Notifications.map((item, index) =>
                <tr key={index} onClick={this.handleClick.bind(this, "selectField", index)}>
                  <td>{item.createdAt}</td>
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
