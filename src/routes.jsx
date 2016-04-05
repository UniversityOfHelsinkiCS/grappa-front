import React from "react";
import { Route, IndexRedirect } from "react-router";
import App from "./app/App.smart";
import ThesisList from "./thesis/ThesisList.smart";
import ThesisShow from "./thesis/ThesisShow.smart";
import ThesisCreate from "./thesis/ThesisCreate.smart";
import CouncilmeetingCreate from "./councilmeeting/CouncilmeetingCreate.smart";

export default (
  <Route path="/" component={App}>
    <Route path="thesis" component={ThesisList} />
    <Route path="thesis/new" component={ThesisCreate} />
    <Route path="thesis/:id" component={ThesisShow} />
    <Route path="councilmeeting/new" component={CouncilmeetingCreate} />
    <IndexRedirect to="/thesis" />
  </Route>
);
