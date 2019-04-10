import React from "react";
import ModelList from "../../Pages/ModelList/ModelList";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { styles } from "./MedicationView.styles";

const Blog = ({
  blogs,
  blogs_createModel,
  blogs_getModel,
  blogs_updateModel,
  blogs_deleteModel,
  blogs_searchModel,
  blogs_gallery_upload,
  blogs_media_upload,
  blogs_media_delete,
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
      modelArray={blogs}
      modelKey={"title"}
      modelName={modelName}
      columns={["title", "status"]}
      createModel={blogs_createModel}
      updateModel={blogs_updateModel}
      getModel={blogs_getModel}
      deleteModel={blogs_deleteModel}
      searchModel={blogs_searchModel}
      uploadMedia={blogs_media_upload}
      uploadGallery={blogs_gallery_upload}
      deleteMedia={blogs_media_delete}
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

export default withStyles(styles)(Blog);
