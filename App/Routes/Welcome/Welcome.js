import React from "react";
import ModelList from "../../Pages/ModelList/ModelList";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./Welcome.styles";
import MainWrapper from "../../Wrappers/MainWrapper";

const App = ({ location, match, history, classes, ...rest }) => {
  return (
    <MainWrapper
      match={match}
      history={history}
      location={location}
      searchModel={searchModel}
      modelKey={"title"}
    >
      <ModelList
        modelArray={medications}
        modelTypes={
          medications_types &&
          medications_types
            .filter((v, i, a) => a.indexOf(v) === i)
            .filter(v => v.trim().length !== 0)
            .filter(
              v =>
                v.toLowerCase() !== "tapering guidelines" &&
                v.toLowerCase() !== "titrating guidelines" &&
                v.toLowerCase() !== "antidepressant switching guideline" &&
                v.toLowerCase() !== "key legend"
            )
        }
        modelKey={"title"}
        modelName={"medication"}
        columns={columns}
        createModel={medications_createModel}
        updateModel={medications_updateModel}
        getModel={medications_getModel}
        deleteModel={medications_deleteModel}
        searchModel={searchModel}
        uploadMedia={medications_media_upload}
        uploadGallery={medications_gallery_upload}
        deleteMedia={medications_media_delete}
        location={location}
        match={match}
        history={history}
        classes={classes}
        form={{
          fields: columns.map(col => {
            return {
              type: "text",
              name: col,
              placeholder: col
            };
          })
        }}
        notifications={notifications}
        saveNotification={saveNotification}
        removeNotification={removeNotification}
        hideAddButton
      />
    </MainWrapper>
  );
};

export default withStyles(styles)(App);
