import ReactDOM from "react-dom";
import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Store from "./App/Store/Store";

import { csvDomainStore } from "./react+react-native";
let rootStore = new Store({
  csvDomainStore
});
import App from "./App/App.js";

ReactDOM.render(
  <div>
    <Router>
      <Route
        path={`/`}
        render={({ match }) => {
          return <App match={match} rootStore={rootStore} />;
        }}
      />
    </Router>
  </div>,
  document.getElementById("app")
);
