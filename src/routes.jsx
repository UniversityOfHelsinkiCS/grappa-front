import React from "react";
import { Route } from "react-router";
import { redirectNonUser, redirectNonAdmin, redirectNonPrintPerson } from "./middleware/restrictAccess";

import App from "./app/App";

import Ethesis from "./ethesis/Ethesis";
import ShowDocument from "thesis/ShowDocument";
import ThesisList from "./thesis/ThesisList";
import ThesisShowEdit from "./thesis/ThesisShowEdit";
import ThesisCreate from "./thesis/ThesisCreate";

import CouncilMeetingContainer from "./councilmeeting/CouncilMeetingListCreate";
import CouncilMeetingShow from "./councilmeeting/CouncilMeetingShow";
import StudyFieldList from "./studyfield/StudyFieldList";
import EmailDraftList from "./email/EmailDraftList";
import NotificationList from "notification/NotificationList";
// import EmailstatusList from "./emailstatus/EmailstatusList.smart";
import UserList from "./user/UserList";
import UserListNotActive from "./user/UserListNotActive";
import UserShow from "./user/UserShow";
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import RequestResetPassword from "auth/RequestResetPassword";
import ResetPassword from "auth/ResetPassword";

import Intro from "./app/Introduction";
import About from "./app/About";
import NotFound from "./app/NotFound";

export default (
  <Route>
    <Route path="/ethesis/:token" component={Ethesis}/>
    <Route path="/thesis/:id/:type" component={ShowDocument} />
    <Route path="" component={App}>
      <Route path="/" component={Intro}/>
      <Route path="/thesis" component={ThesisList} onEnter={redirectNonUser} />
      <Route path="/thesis/new" component={ThesisCreate} onEnter={redirectNonUser} />
      <Route path="/thesis/:id" component={ThesisShowEdit} onEnter={redirectNonUser} />
      <Route path="/councilmeeting/:id" component={CouncilMeetingShow} onEnter={redirectNonPrintPerson} />
      <Route path="/councilmeeting" component={CouncilMeetingContainer} onEnter={redirectNonAdmin} />
      <Route path="/studyfield" component={StudyFieldList} onEnter={redirectNonAdmin} />
      <Route path="/emaildraft" component={EmailDraftList} onEnter={redirectNonAdmin} />
      <Route path="/notification" component={NotificationList} onEnter={redirectNonAdmin} />
      <Route path="/user" component={UserList} onEnter={redirectNonAdmin} />
      <Route path="/user/inactive" component={UserListNotActive} onEnter={redirectNonAdmin} />
      <Route path="/user/me" component={UserShow} onEnter={redirectNonUser} />
      <Route path="/registration" component={Registration} />
      <Route path="/login" component={Login} />
      <Route path="/reset-password" component={RequestResetPassword} />
      <Route path="/reset-password/:token" component={ResetPassword} />
      <Route path="/about" component={About}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Route>
);
