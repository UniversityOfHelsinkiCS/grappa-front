export const NOTIFICATION_GET_ALL = "NOTIFICATION_GET_ALL";
export const NOTIFICATION_SET_READ = "NOTIFICATION_SET_READ";

export const getNotifications = () => (
  {
    type: NOTIFICATION_GET_ALL,
    payload: {
      request: {
        url: "/notification",
        method: "get",
        data: {}
      }
    }
  }
);

export const setNotificationsRead = (data) => (
  {
    type: NOTIFICATION_SET_READ,
    payload: {
      request: {
        method: "post",
        url: "/notification/read",
        data,
      }
    }
  }
);