import React from "react";
import { Route } from "react-router";
import { redirectNonUser, redirectNonAdmin, redirectNonPrintPerson } from "./middleware/restrictAccess";

import App from "./app/App.component";

import Ethesis from "./ethesis/Ethesis.container";
import ShowDocument from "thesis/ShowDocument.component";
import ThesisList from "./thesis/ThesisList.container";
import ThesisShowEdit from "./thesis/ThesisShowEdit.container";
import ThesisCreate from "./thesis/ThesisCreate.container";

import CouncilMeetingContainer from "./councilmeeting/CouncilMeetingListCreate.container";
import CouncilMeetingShow from "./councilmeeting/CouncilMeetingShow.container";
import StudyFieldList from "./studyfield/StudyFieldList.container";
import EmailDraftList from "./email/EmailDraftList.container";
import NotificationList from "notification/NotificationList";
// import EmailstatusList from "./emailstatus/EmailstatusList.smart";
import UserList from "./user/UserList.container";
import UserListNotActive from "./user/UserListNotActive.container";
import UserShow from "./user/UserShow.container";
import Registration from "./auth/Registration";
import Login from "./auth/Login.container";
import RequestResetPassword from "auth/RequestResetPassword";
import ResetPassword from "auth/ResetPassword";

import Intro from "./app/Introduction.component";
import About from "./app/About.component";
import NotFound from "./app/NotFound.component";

export default (
  <Route>
    <Route path="/ethesis/:token" component={Ethesis}/>
    <Route path="/thesis/:id/:type" component={ShowDocument} />
    <Route path="/" component={App}>
      <Route path="thesis" component={ThesisList} onEnter={redirectNonUser} />
      <Route path="thesis/new" component={ThesisCreate} onEnter={redirectNonUser} />
      <Route path="thesis/:id" component={ThesisShowEdit} onEnter={redirectNonUser} />
      <Route path="councilmeeting/:id" component={CouncilMeetingShow} onEnter={redirectNonPrintPerson} />
      <Route path="councilmeeting" component={CouncilMeetingContainer} onEnter={redirectNonAdmin} />
      <Route path="studyfield" component={StudyFieldList} onEnter={redirectNonAdmin} />
      <Route path="emaildraft" component={EmailDraftList} onEnter={redirectNonAdmin} />
      <Route path="notification" component={NotificationList} onEnter={redirectNonAdmin} />
      <Route path="user" component={UserList} onEnter={redirectNonAdmin} />
      <Route path="user/inactive" component={UserListNotActive} onEnter={redirectNonAdmin} />
      <Route path="user/me" component={UserShow} onEnter={redirectNonUser} />
      <Route path="registration" component={Registration} />
      <Route path="login" component={Login} />
      <Route path="reset-password" component={RequestResetPassword} />
      <Route path="reset-password/:token" component={ResetPassword} />
      <Route path="intro" component={Intro}/>
      <Route path="about" component={About}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Route>
);
