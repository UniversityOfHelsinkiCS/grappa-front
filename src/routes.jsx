import React from "react";
import { Route, IndexRedirect } from "react-router";
import App from "./app/App.smart";
import ThesisList from "./thesis/ThesisList.smart";
import ThesisShow from "./thesis/ThesisShow.smart";
import ThesisCreate from "./thesis/ThesisCreate.smart";

export default (
  <Route path="/" component={App}>
    <Route path="theses" component={ThesisList} />
    <Route path="thesis/new" component={ThesisCreate} />
    <Route path="theses/:id" component={ThesisShow} />
    <IndexRedirect to="/theses" />
  </Route>
);
