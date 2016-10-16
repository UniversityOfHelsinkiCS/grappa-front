export const SEND_REMINDER = "SEND_REMINDER";

export const sendReminder = (thesisId, reminderType) => (
  {
    type: SEND_REMINDER,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for EmailReminder to be sent.",
    },
    successMessage: {
      type: "success",
      title: "Success",
      body: "EmailReminder has been sent.",
    },
    payload: {
      request: {
        method: "post",
        url: "/email/remind",
        data: {
          thesisId,
          reminderType,
        },
      }
    }
  }
);

export const EMAILDRAFT_GET_ALL = "EMAILDRAFT_GET_ALL";
export const EMAILDRAFT_UPDATE_ONE = "EMAILDRAFT_UPDATE_ONE";

export const getEmailDrafts = () => (
  {
    type: EMAILDRAFT_GET_ALL,
    payload: {
      request: {
        url: "/emaildraft",
        method: "get",
        data: {}
      }
    }
  }
);

export const updateEmailDraft = (data) => (
  {
    type: EMAILDRAFT_UPDATE_ONE,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for Emaildraft to be updated.",
    },
    successMessage: {
      type: "success",
      title: "Success",
      body: "Emaildraft was updated.",
    },
    payload: {
      request: {
        method: "put",
        url: `/emaildraft/${data.id}`,
        data,
      }
    }
  }
);
