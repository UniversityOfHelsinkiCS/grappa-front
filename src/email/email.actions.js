export const SEND_REMINDER = "SEND_REMINDER";

export const sendReminder = (thesisId, reminderType) => ({
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
});

export const EMAILDRAFT_GET_ALL = "EMAILDRAFT_GET_ALL";
export const EMAILDRAFT_UPDATE_ONE = "EMAILDRAFT_UPDATE_ONE";
export const EMAILDRAFT_CREATE_ONE = "EMAILDRAFT_CREATE_ONE";
export const EMAILDRAFT_DELETE_ONE = "EMAILDRAFT_DELETE_ONE";

export const getEmailDrafts = () => ({
  type: EMAILDRAFT_GET_ALL,
  payload: {
    request: {
      url: "/emaildraft",
      method: "get",
      data: {}
    }
  }
});

export const createEmailDraft = (data) => ({
  type: EMAILDRAFT_CREATE_ONE,
  flashMessage: {
    type: "warning",
    title: "Request sent",
    body: "Waiting for Emaildraft to be added.",
  },
  successMessage: {
    type: "success",
    title: "Success",
    body: "Emaildraft was added.",
  },
  payload: {
    request: {
      method: "post",
      url: `/emaildraft/${data.id}`,
      data,
    }
  }
});

export const updateEmailDraft = (data) => ({
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
});

export const deleteEmailDraft = (data) => ({
  type: EMAILDRAFT_DELETE_ONE,
  flashMessage: {
    type: "warning",
    title: "Request sent",
    body: "Waiting for Emaildraft to be deleted.",
  },
  successMessage: {
    type: "success",
    title: "Success",
    body: "Emaildraft was deleted.",
  },
  payload: {
    request: {
      method: "delete",
      url: `/emaildraft/${data.id}`,
      data,
    }
  }
});