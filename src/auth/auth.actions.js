import { browserHistory } from "react-router";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

import { getTheses } from "../thesis/thesis.actions";
import { getGraders } from "../grader/grader.actions";
import { getCouncilMeetings } from "../councilmeeting/councilmeeting.actions";
import { getStudyFields } from "../studyfield/studyfield.actions";
import { getUsers } from "../user/user.actions";
import { getEmailDrafts } from "../email/email.actions";

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
          ])
        } else {
          return Promise.all([
            dispatch(getTheses()),
            dispatch(getGraders()),
            dispatch(getCouncilMeetings()),
            dispatch(getStudyFields()),
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

export const logout = () => (
  {
    type: LOGOUT_USER,
  }
)
