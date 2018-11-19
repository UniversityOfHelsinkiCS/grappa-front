import React from "react";
import { Route } from "react-router";
import { redirectNonUser, redirectNonAdmin, redirectNonPrintPerson } from "./middleware/restrictAccess";

import App from "./app/App";

import Ethesis from "./ethesis/Ethesis";
import ShowDocument from "thesis/ShowDocument";
import ThesisListPage from "./thesis/ThesisListPage";
import ThesisEditPage from "./thesis/ThesisEditPage";
import ThesisCreatePage from "./thesis/ThesisCreatePage";
import Statistics from "./thesis/StatisticsPage";

import CouncilMeetingContainer from "./councilmeeting/CouncilMeetingListCreate";
import CouncilMeetingShow from "./councilmeeting/CouncilMeetingShow";
import StudyfieldListPage from "./studyfield/StudyfieldListPage";
import EmailDraftPage from "./email/EmailDraftPage";
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
    <Route path="/v1/ethesis/:token" component={Ethesis} />
    <Route path="/v1/thesis/:id/:type" component={ShowDocument} />
    <Route path="/v1" component={App}>
      <Route path="/v1/" component={Intro} />
      <Route path="/v1/thesis" component={ThesisListPage} onEnter={redirectNonUser} />
      <Route path="/v1/thesis/new" component={ThesisCreatePage} onEnter={redirectNonUser} />
      <Route path="/v1/thesis/:id" component={ThesisEditPage} onEnter={redirectNonUser} />
      <Route path="/v1/councilmeeting/:id" component={CouncilMeetingShow} onEnter={redirectNonPrintPerson} />
      <Route path="/v1/councilmeeting" component={CouncilMeetingContainer} onEnter={redirectNonPrintPerson} />
      <Route path="/v1/studyfield" component={StudyfieldListPage} onEnter={redirectNonAdmin} />
      <Route path="/v1/emaildraft" component={EmailDraftPage} onEnter={redirectNonAdmin} />
      <Route path="/v1/notification" component={NotificationList} onEnter={redirectNonAdmin} />
      <Route path="/v1/user" component={UserList} onEnter={redirectNonAdmin} />
      <Route path="/v1/user/inactive" component={UserListNotActive} onEnter={redirectNonAdmin} />
      <Route path="/v1/user/me" component={UserShow} onEnter={redirectNonUser} />
      <Route path="/v1/registration" component={Registration} />
      <Route path="/v1/login" component={Login} />
      <Route path="/v1/statistics" component={Statistics} />
      <Route path="/v1/reset-password" component={RequestResetPassword} />
      <Route path="/v1/reset-password/:token" component={ResetPassword} />
      <Route path="/v1/about" component={About} />
      <Route path="*" component={NotFound} />
    </Route>
  </Route>
);
