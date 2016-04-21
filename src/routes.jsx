import React from "react";
import { Route, IndexRedirect } from "react-router";
import App from "./app/App.smart";
import ThesisList from "./thesis/ThesisList.smart";
import Ethesis from "./ethesis/Ethesis.smart";
import ThesisShow from "./thesis/ThesisShow.smart";
import ThesisCreate from "./thesis/ThesisCreate.smart";
import CouncilmeetingCreate from "./councilmeeting/CouncilmeetingCreate.smart";
import CouncilmeetingList from "./councilmeeting/CouncilmeetingList.smart";
import Login from "./login/Login.smart";
import NewUsersList from "./usermanagement/NewUsersList.smart";

export default (
  <Route>
    <Route path="/ethesis/:token" component={Ethesis}/>
    <Route path="/" component={App}>
      <Route path="thesis" component={ThesisList} />
      <Route path="thesis/new" component={ThesisCreate} />
      <Route path="thesis/:id" component={ThesisShow} />
      <Route path="councilmeeting/new" component={CouncilmeetingCreate} />
      <Route path="councilmeeting" component={CouncilmeetingList} />
      <Route path="login" component={Login} />
      <Route path="users" component={NewUsersList} />
      <IndexRedirect to="/thesis" />
    </Route>
  </Route>
);
