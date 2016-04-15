import React from "react";
import { Route, IndexRedirect } from "react-router";
import App from "./app/App.smart";
import ThesisList from "./thesis/ThesisList.smart";
import Ethesis from "./ethesis/Ethesis.smart";
import ThesisShow from "./thesis/ThesisShow.smart";
import ThesisCreate from "./thesis/ThesisCreate.smart";
import CouncilmeetingCreate from "./councilmeeting/CouncilmeetingCreate.smart";
import CouncilmeetingList from "./councilmeeting/CouncilmeetingList.smart";

export default (
  <Route>
    <Route path="/ethesis" component={Ethesis}/>
    <Route path="/" component={App}>
      <Route path="thesis" component={ThesisList} />
      <Route path="thesis/new" component={ThesisCreate} />
      <Route path="thesis/:id" component={ThesisShow} />
      <Route path="councilmeeting/new" component={CouncilmeetingCreate} />
      <Route path="councilmeeting" component={CouncilmeetingList} />
      <IndexRedirect to="/thesis" />
    </Route>
  </Route>
);
