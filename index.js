import ReactDOM from "react-dom";
import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Store from "./App/Store/Store";

import { csvDomainStore, CSV } from "./react+react-native";
let rootStore = new Store({
  csvDomainStore
});
import App from "./App/App.js";

ReactDOM.render(
  <div>
    <Router>
      <Route
        path={`/`}
        render={({ match, history, location }) => {
          return (
            <CSV
              csvDomainStore={rootStore.csvDomainStore}
              modelName="medications"
            >
              <App
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
    </Router>
  </div>,
  document.getElementById("app")
);
