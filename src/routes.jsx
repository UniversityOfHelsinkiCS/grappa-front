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

const restrictNonUser = (nextState, replace) => {
  console.log("checking if user");
  const user = store.getState().get("auth").get("user").toJS();
  if (user.role === "") {
    console.log("wasnt user");
    replace({
      location: {
        pathname: "/login",
      },
    });
  }
};

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
  }
};

export default (
  <Route>
    <Route path="/ethesis/:token" component={Ethesis}/>
    <Route path="/" component={App}>
      <Route path="thesis" component={ThesisList} onEnter={restrictNonUser} />
      <Route path="thesis/new" component={ThesisCreate} onEnter={restrictNonUser} />
      <Route path="thesis/:id" component={ThesisShow} onEnter={restrictNonUser} />
      <Route path="councilmeeting/new" component={CouncilmeetingCreate} onEnter={restrictNonAdmin} />
      <Route path="councilmeeting" component={CouncilmeetingList} onEnter={restrictNonAdmin} />
      <Route path="user" component={UserShow} onEnter={restrictNonUser} />
      <Route path="login" component={Login} />
      <IndexRedirect to="/login" />
    </Route>
  </Route>
);
