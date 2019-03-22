import ReactDOM from "react-dom";
import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";
import App from "./App/App.js";

ReactDOM.render(
  <div>
    <Router>
      <App rootStore={rootStore} />
    </Router>
  </div>,
  document.getElementById("app")
);
