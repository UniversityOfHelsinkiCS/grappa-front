import { CALL_API } from "../middleware/grappaAPI";

export const SEND_NOTIFICATION_SUCCESS = "SEND_NOTIFICATION_SUCCESS";
export const SEND_NOTIFICATION_FAILURE = "SEND_NOTIFICATION_FAILURE";

export const sendNotification = (data) => {
  console.log("sendNotification-action called!");
  return {
    type: CALL_API,
    success: SEND_NOTIFICATION_SUCCESS,
    failure: SEND_NOTIFICATION_FAILURE,
    method: "post",
    url: "/email/remind",
    data,
  };
};
