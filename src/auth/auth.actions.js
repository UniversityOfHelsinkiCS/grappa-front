import { browserHistory } from "react-router";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const SEND_NEW_PASSWORD = "SEND_NEW_PASSWORD";

import { getTheses } from "../thesis/thesis.actions";
import { getGraders } from "../grader/grader.actions";
import { getCouncilMeetings } from "../councilmeeting/councilmeeting.actions";
import { getStudyFields } from "../studyfield/studyfield.actions";
import { getUsers } from "../user/user.actions";
import { getEmailDrafts } from "../email/email.actions";
import { setLogoutTimeout, unsetTimer } from "ping/ping.actions";

export const loginUser = (email, password) => {
  return (dispatch, getState) => {
    return dispatch(loginAction(email, password)).then((action) => {
      if (action.type === "LOGIN_USER_SUCCESS") {
        browserHistory.push("/user/me");
        const role = action.payload.user.role;
        if (role === "admin") {
          return Promise.all([
            dispatch(getTheses()),
            dispatch(getGraders()),
            dispatch(getCouncilMeetings()),
            dispatch(getStudyFields()),
            dispatch(getUsers()),
            dispatch(getEmailDrafts()),
            dispatch(setLogoutTimeout()),
          ])
        } else {
          return Promise.all([
            dispatch(getTheses()),
            dispatch(getGraders()),
            dispatch(getCouncilMeetings()),
            dispatch(getStudyFields()),
            dispatch(setLogoutTimeout()),
          ])
        }
      }
    })
  };
}

const loginAction = (email, password) => (
  {
    type: LOGIN_USER,
    payload: {
      request: {
        url: "/login",
        method: "post",
        data: {
          email,
          password
        }
      }
    }
  }
);

export const logout = () => {
  return (dispatch, getState) => {
    browserHistory.push("/login");
    return Promise.all([
      dispatch(unsetTimer()),
      dispatch(logoutAction()),
    ])
  };
}

const logoutAction = () => (
  {
    type: LOGOUT_USER,
  }
)

export const requestPasswordResetion = (email) => (
  {
    type: "USER_RESET_PASSWORD",
    flashMessage: {
      type: "warning",
      title: "Request sent",
      body: "Waiting for email to be sent.",
    },
    successMessage: {
      type: "success",
      title: "Success",
      body: "Password resetion link has been emailed to you.",
    },
    payload: {
      request: {
        url: "/user/reset-password",
        method: "post",
        data: {
          email,
        }
      }
    }
  }
);

export const sendNewPassword = (token) => {
  return (dispatch, getState) => {
    return dispatch(sendNewPasswordAction(token)).then((action) => {
        return action.type === "SEND_NEW_PASSWORD_SUCCESS";
      })
  };
}

const sendNewPasswordAction = (token) => (
  {
    type: SEND_NEW_PASSWORD,
    payload: {
      request: {
        url: "/user/send-new-password",
        method: "post",
        data: {
          token,
        }
      }
    }
  }
)
