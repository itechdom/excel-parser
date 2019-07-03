import ReactDOM from "react-dom";
import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import * as OfflinePluginRuntime from "offline-plugin/runtime";
OfflinePluginRuntime.install();
import Store from "./App/Store/Store";
import { csvDomainStore, CSV } from "./react+react-native";
let rootStore = new Store({
  csvDomainStore
});

import Medications from "./App/Routes/Medications/Medications";
import Guide from "./App/Routes/Guide/Guide";
import Welcome from "./App/Routes/Welcome/Welcome";

const App = withRouter(({}) => (
  <Switch>
    <Route
      path="/guide"
      render={({ match, history, location }) => {
        return (
          <CSV
            csvDomainStore={rootStore.csvDomainStore}
            modelName="medications"
          >
            <Guide
              modelName="guide"
              match={match}
              history={history}
              location={location}
              rootStore={rootStore}
            />
          </CSV>
        );
      }}
    />
    <Route
      path="welcome"
      render={({ match, history, location }) => {
        return (
          <CSV
            csvDomainStore={rootStore.csvDomainStore}
            modelName="medications"
          >
            <Welcome
              modelName="guide"
              match={match}
              history={history}
              location={location}
              rootStore={rootStore}
            />
          </CSV>
        );
      }}
    />
    <Route
      path="/"
      render={({ match, history, location }) => {
        return (
          <CSV
            csvDomainStore={rootStore.csvDomainStore}
            modelName="medications"
          >
            <Medications
              modelName="medications"
              match={match}
              history={history}
              location={location}
              rootStore={rootStore}
            />
          </CSV>
        );
      }}
    />
  </Switch>
));
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
