export const USER_GET_ALL = "USER_GET_ALL";
export const USER_SAVE_ONE = "USER_SAVE_ONE";
export const USER_UPDATE_ONE = "USER_UPDATE_ONE";
export const USER_DELETE_ONE = "USER_DELETE_ONE";

export const getUsers = () => (
  {
    type: USER_GET_ALL,
    payload: {
      request: {
        url: "/user",
        method: "get",
        data: {}
      }
    }
  }
);

export const saveUser = (data) => (
  {
    type: USER_SAVE_ONE,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for your account to be created.",
    },
    successMessage: {
      type: "success",
      title: "Success",
      body: "You've succesfully registered. You can log in once the admin has activated your account.",
    },
    payload: {
      request: {
        method: "post",
        url: "/user",
        data,
      }
    }
  }
);

export const updateUser = (data) => (
  {
    type: USER_UPDATE_ONE,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for User to be updated.",
    },
    successMessage: {
      type: "success",
      title: "Success",
      body: "User was updated.",
    },
    payload: {
      request: {
        method: "put",
        url: `/user/${data.id}`,
        data,
      }
    }
  }
);

export const deleteUser = (data) => (
  {
    type: USER_DELETE_ONE,
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for User to be deleted.",
    },
    successMessage: {
      type: "warning",
      title: "Success",
      body: "User was deleted.",
    },
    payload: {
      request: {
        method: "delete",
        url: `/user/${data.id}`,
        data,
      }
    }
  }
);
