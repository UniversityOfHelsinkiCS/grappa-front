import React from "react";
import { Route } from "react-router";
import { restrictNonUser, restrictNonAdmin } from "./middleware/restrictAccess";
import App from "./app/App.component";
import ThesisList from "./thesis/ThesisList.smart";
import Ethesis from "./ethesis/Ethesis.smart";
import ThesisShow from "./thesis/ThesisShow.smart";
import ThesisCreate from "./thesis/ThesisCreate.smart";
import CouncilmeetingCreate from "./councilmeeting/CouncilmeetingCreate.smart";
import CouncilmeetingList from "./councilmeeting/CouncilmeetingList.smart";
import UserShow from "./user/UserShow.smart";
import UserNotActiveList from "./user/UserNotActiveList.smart";
import Login from "./auth/Login.smart";
import NotFound from "./app/NotFound.component";
import UserRegistration from "./user/UserRegistration.smart";

export default (
  <Route>
    <Route path="/ethesis/:token" component={Ethesis}/>
    <Route path="/" component={App}>
      <Route path="thesis" component={ThesisList} onEnter={restrictNonUser} />
      <Route path="thesis/new" component={ThesisCreate} onEnter={restrictNonUser} />
      <Route path="thesis/:id" component={ThesisShow} onEnter={restrictNonUser} />
      <Route path="councilmeeting/new" component={CouncilmeetingCreate} onEnter={restrictNonAdmin} />
      <Route path="councilmeeting" component={CouncilmeetingList} onEnter={restrictNonAdmin} />
      <Route path="user" component={UserNotActiveList} onEnter={restrictNonAdmin} />
      <Route path="user/me" component={UserShow} onEnter={restrictNonUser} />
      <Route path="login" component={Login} />
      <Route path="registration" component={UserRegistration} />
      <Route path="*" component={NotFound}/>
    </Route>
  </Route>
);
