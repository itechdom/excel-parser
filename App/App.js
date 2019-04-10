import React from "react";
import ModelList from "./Pages/ModelList/ModelList";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { styles } from "./App.styles";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";

const App = ({
  medications,
  medications_createModel,
  medications_getModel,
  medications_updateModel,
  medications_deleteModel,
  medications_searchModel,
  medications_gallery_upload,
  medications_media_upload,
  medications_media_delete,
  location,
  match,
  history,
  classes,
  form,
  notifications,
  saveNotification,
  removeNotification,
  modelName
}) => {
  return (
    <ModelList
      modelArray={medications}
      modelKey={"title"}
      modelName={modelName}
      columns={["title", "status"]}
      createModel={medications_createModel}
      updateModel={medications_updateModel}
      getModel={medications_getModel}
      deleteModel={medications_deleteModel}
      searchModel={medications_searchModel}
      uploadMedia={medications_media_upload}
      uploadGallery={medications_gallery_upload}
      deleteMedia={medications_media_delete}
      location={location}
      match={match}
      history={history}
      classes={classes}
      form={form}
      notifications={notifications}
      saveNotification={saveNotification}
      removeNotification={removeNotification}
    />
  );
};

export default withStyles(styles)(App);
