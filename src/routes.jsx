import React from "react";
import { Route, IndexRedirect } from "react-router";
import App from "./app/App.component";
import ThesisList from "./thesis/ThesisList.smart";
import Ethesis from "./ethesis/Ethesis.smart";
import ThesisShow from "./thesis/ThesisShow.smart";
import ThesisCreate from "./thesis/ThesisCreate.smart";
import CouncilmeetingCreate from "./councilmeeting/CouncilmeetingCreate.smart";
import CouncilmeetingList from "./councilmeeting/CouncilmeetingList.smart";
import UserShow from "./user/UserShow.smart";
import Login from "./auth/Login.smart";

import store from "./store";

const restrictNonAdmin = (nextState, replace) => {
  console.log("checking if admin");
  const user = store.getState().get("auth").get("user").toJS();
  if (user.role !== "admin") {
    console.log("wasnt admin :/");
    replace({
      location: {
        pathname: "/login",
      },
    });
  } else {
    console.log("was admin!");
    console.log(nextState);
    replace({
      location: {
        pathname: "/login",
      },
    });
  }
};

export default (
  <Route>
    <Route path="/ethesis/:token" component={Ethesis}/>
    <Route path="/" component={App}>
      <Route path="thesis" component={ThesisList} />
      <Route path="thesis/new" component={ThesisCreate} />
      <Route path="thesis/:id" component={ThesisShow} />
      <Route path="councilmeeting/new" component={CouncilmeetingCreate} />
      <Route path="councilmeeting" component={CouncilmeetingList} />
      <Route path="user" component={UserShow} onEnter={restrictNonAdmin} />
      <Route path="login" component={Login} />
      <IndexRedirect to="/login" />
    </Route>
  </Route>
);
