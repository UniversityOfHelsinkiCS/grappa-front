import { CALL_API } from "../middleware/grappaAPI";

export const SEND_REMINDER_SUCCESS = "SEND_REMINDER_SUCCESS";
export const SEND_REMINDER_FAILURE = "SEND_REMINDER_FAILURE";

export const sendReminder = (thesisId, reminderType) => (
  {
    type: CALL_API,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for EmailReminder to be sent.",
    },
    success: SEND_REMINDER_SUCCESS,
    successMessage: {
      type: "success",
      title: "Success",
      body: "EmailReminder has been sent.",
    },
    failure: SEND_REMINDER_FAILURE,
    method: "post",
    url: "/email/remind",
    data: {
      thesisId,
      reminderType,
    },
  }
);

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
