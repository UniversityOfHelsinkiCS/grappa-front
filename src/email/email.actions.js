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

export const EMAILDRAFT_GET_ALL_SUCCESS = "EMAILDRAFT_GET_ALL_SUCCESS";
export const EMAILDRAFT_GET_ALL_FAILURE = "EMAILDRAFT_GET_ALL_FAILURE";

export const EMAILDRAFT_UPDATE_ONE_SUCCESS = "EMAILDRAFT_UPDATE_ONE_SUCCESS";
export const EMAILDRAFT_UPDATE_ONE_FAILURE = "EMAILDRAFT_UPDATE_ONE_FAILURE";

export const getEmailDrafts = () => (
  {
    type: CALL_API,
    success: EMAILDRAFT_GET_ALL_SUCCESS,
    failure: EMAILDRAFT_GET_ALL_FAILURE,
    method: "get",
    url: "/emaildraft",
    data: {},
  }
);

export const updateEmailDraft = (data) => (
  {
    type: CALL_API,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for EmailDraft to be updated.",
    },
    success: EMAILDRAFT_UPDATE_ONE_SUCCESS,
    successMessage: {
      type: "success",
      title: "Success",
      body: "EmailDraft was updated.",
    },
    failure: EMAILDRAFT_UPDATE_ONE_FAILURE,
    method: "put",
    url: `/emaildraft/${data.id}`,
    data,
  }
);
