import React from "react";
import ModelList from "./Pages/ModelList/ModelList";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./App.styles";
import MainWrapper from "./Wrappers/MainWrapper";

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
  modelName,
  ...rest
}) => {
  let columns = [
    "Medication Type",
    "title",
    "Brand Name",
    "Formulation",
    "Initial Dose Range",
    "Usual Titration",
    "Max Dose (rec/obs)",
    "Max Titration",
    "Usual Max Dose",
    "Max Dose",
    "Taper",
    "CYP (Metabolized/Inducer/Inhibitor) with weaker effects in parens",
    "Study Dosage",
    "Study 1",
    "Study 2",
    "Study 3",
    "Notes",
    "Notes 2",
    "Trials/Adverse SE/CI"
  ];
  return (
    <MainWrapper match={match} history={history} location={location}>
      <ModelList
        modelArray={medications}
        modelKey={"title"}
        modelName={"medication"}
        columns={columns}
        createModel={medications_createModel}
        updateModel={medications_updateModel}
        getModel={medications_getModel}
        deleteModel={medications_deleteModel}
        searchModel={query => {
          let q = query.title.$regex;
          return new Promise((resolve, reject) => {
            let a = medications.filter(m => {
              return m.title.match(new RegExp(q));
            });
            return resolve(a);
          });
        }}
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
