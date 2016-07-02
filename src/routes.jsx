import React from "react";
import { Route } from "react-router";
import { redirectNonUser, redirectNonAdmin, redirectNonPrintPerson } from "./middleware/restrictAccess";

import App from "./app/App.component";
import Ethesis from "./ethesis/Ethesis.container";
import ThesisList from "./thesis/ThesisList.container";
import ThesisShowEdit from "./thesis/ThesisShowEdit.container";
import ThesisCreate from "./thesis/ThesisCreate.container";
import CouncilmeetingContainer from "./councilmeeting/CouncilmeetingListCreate.container";
import CouncilmeetingShow from "./councilmeeting/CouncilmeetingShow.container";
import EmailstatusList from "./emailstatus/EmailstatusList.smart";
import UserList from "./user/UserList.container";
import UserListNotActive from "./user/UserListNotActive.container";
import UserShow from "./user/UserShow.container";
import UserRegistration from "./user/UserRegistration.container";
import Login from "./auth/Login.container";
import NotFound from "./app/NotFound.component";

export default (
  <Route>
    <Route path="/ethesis/:token" component={Ethesis}/>
    <Route path="/" component={App}>
      <Route path="thesis" component={ThesisList} onEnter={redirectNonUser} />
      <Route path="thesis/new" component={ThesisCreate} onEnter={redirectNonUser} />
      <Route path="thesis/:id" component={ThesisShowEdit} onEnter={redirectNonUser} />
      <Route path="councilmeeting/:id" component={CouncilmeetingShow} onEnter={redirectNonPrintPerson} />
      <Route path="councilmeeting" component={CouncilmeetingContainer} onEnter={redirectNonAdmin} />
      <Route path="emailstatus" component={EmailstatusList} onEnter={redirectNonAdmin} />
      <Route path="user" component={UserList} onEnter={redirectNonAdmin} />
      <Route path="user/inactive" component={UserListNotActive} onEnter={redirectNonAdmin} />
      <Route path="user/me" component={UserShow} onEnter={redirectNonUser} />
      <Route path="registration" component={UserRegistration} />
      <Route path="login" component={Login} />
      <Route path="*" component={NotFound}/>
    </Route>
  </Route>
);
