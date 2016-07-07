import { CALL_API } from "../middleware/grappaAPI";

// export const SEND_NOTIFICATION_SUCCESS = "SEND_NOTIFICATION_SUCCESS";
// export const SEND_NOTIFICATION_FAILURE = "SEND_NOTIFICATION_FAILURE";

// export const sendNotification = (data) => {
//   console.log("sendNotification-action called!");
//   return {
//     type: CALL_API,
//     success: SEND_NOTIFICATION_SUCCESS,
//     failure: SEND_NOTIFICATION_FAILURE,
//     method: "post",
//     url: "/email/remind",
//     data,
//   };
// };

export const EMAIL_DRAFT_GET_ALL_SUCCESS = "EMAIL_DRAFT_GET_ALL_SUCCESS";
export const EMAIL_DRAFT_GET_ALL_FAILURE = "EMAIL_DRAFT_GET_ALL_FAILURE";

// export const EMAIL_DRAFT_UPDATE_ONE_SUCCESS = "EMAIL_DRAFT_UPDATE_ONE_SUCCESS";
// export const EMAIL_DRAFT_UPDATE_ONE_FAILURE = "EMAIL_DRAFT_UPDATE_ONE_FAILURE";

export const getEmailDrafts = () => (
  {
    type: CALL_API,
    success: EMAIL_DRAFT_GET_ALL_SUCCESS,
    failure: EMAIL_DRAFT_GET_ALL_FAILURE,
    method: "get",
    url: "/emaildraft",
    data: {},
  }
);
