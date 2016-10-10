export const COUNCILMEETING_GET_ALL = "COUNCILMEETING_GET_ALL";
export const COUNCILMEETING_SAVE_ONE = "COUNCILMEETING_SAVE_ONE";
export const COUNCILMEETING_UPDATE_ONE = "COUNCILMEETING_UPDATE_ONE";

export const getCouncilMeetings = (filterParams) => (
  {
    type: COUNCILMEETING_GET_ALL,
    payload: {
      request: {
        url: "/councilmeeting",
        method: "get",
        data: filterParams
      }
    }
  }
);

export const saveCouncilMeeting = (data) => (
  {
    type: COUNCILMEETING_UPDATE_ONE,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for Councilmeeting to be saved.",
    },
    successMessage: {
      type: "success",
      title: "Success",
      body: "Councilmeeting was saved.",
    },
    payload: {
      request: {
        method: "post",
        url: "/councilmeeting",
        data,
      }
    }
  }
);

export const updateCouncilMeeting = (data) => (
  {
    type: COUNCILMEETING_UPDATE_ONE,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for Councilmeeting to be updated.",
    },
    successMessage: {
      type: "success",
      title: "Success",
      body: "Councilmeeting was updated.",
    },
    payload: {
      request: {
        method: "put",
        url: `/councilmeeting/${data.id}`,
        data,
      }
    }
  }
);
