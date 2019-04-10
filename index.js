import ReactDOM from "react-dom";
import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";
import { csvDomainStore, notificationDomainStore } from "./react+react-native";
let rootStore = new Store({
  notificationDomainStore,
  csvDomainStore
});
import App from "./App/App.js";

ReactDOM.render(
  <div>
    <Router>
      <App rootStore={rootStore} />
    </Router>
  </div>,
  document.getElementById("app")
);
