import React from "react";
import { Route } from "react-router";
import { redirectNonUser, redirectNonAdmin, redirectNonPrintPerson } from "./middleware/restrictAccess";
import App from "./app/App.component";
import Ethesis from "./ethesis/Ethesis.smart";
import ThesisList from "./thesis/ThesisList.smart";
import ThesisShow from "./thesis/ThesisShow.smart";
import ThesisCreate from "./thesis/ThesisCreate.smart";
// import CouncilmeetingCreate from "./councilmeeting/CouncilmeetingCreate.smart";
import CouncilmeetingList from "./councilmeeting/CouncilmeetingList.smart";
import CouncilmeetingShow from "./councilmeeting/CouncilmeetingShow.smart";
import UserList from "./user/UserList.smart";
import UserNotActiveList from "./user/UserNotActiveList.smart";
import UserShow from "./user/UserShow.smart";
import EmailstatusList from "./emailstatus/EmailstatusList.smart";
import Login from "./auth/Login.smart";
import NotFound from "./app/NotFound.component";
import UserRegistration from "./user/UserRegistration.smart";

export default (
  <Route>
    <Route path="/ethesis/:token" component={Ethesis}/>
    <Route path="/" component={App}>
      <Route path="thesis" component={ThesisList} onEnter={redirectNonUser} />
      <Route path="thesis/new" component={ThesisCreate} onEnter={redirectNonUser} />
      <Route path="thesis/:id" component={ThesisShow} onEnter={redirectNonUser} />
      <Route path="councilmeeting/:id" component={CouncilmeetingShow} onEnter={redirectNonPrintPerson} />
      <Route path="councilmeeting" component={CouncilmeetingList} onEnter={redirectNonAdmin} />
      <Route path="user" component={UserList} onEnter={redirectNonAdmin} />
      <Route path="user/inactive" component={UserNotActiveList} onEnter={redirectNonAdmin} />
      <Route path="user/me" component={UserShow} onEnter={redirectNonUser} />
      <Route path="login" component={Login} />
      <Route path="emailstatus" component={EmailstatusList} onEnter={redirectNonAdmin} />
      <Route path="registration" component={UserRegistration} />
      <Route path="*" component={NotFound}/>
    </Route>
  </Route>
);
