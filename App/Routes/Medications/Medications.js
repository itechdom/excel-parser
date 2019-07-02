import React from "react";
import ModelList from "../../Pages/ModelList/ModelList";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./Medications.styles";
import MainWrapper from "../../Wrappers/MainWrapper";

const App = ({
  medications,
  medications_types,
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
  const searchModel = (query, type) => {
    let q = query.title.$regex;
    let a = [];
    return new Promise((resolve, reject) => {
      if (type && type !== "ALL") {
        a = medications.filter(m => {
          return (
            m.title.toLowerCase().match(new RegExp(q.toLowerCase())) &&
            m["Medication Type"] === type
          );
        });
      } else {
        a = medications.filter(m => {
          return m.title.toLowerCase().match(new RegExp(q.toLowerCase()));
        });
      }
      return resolve(a);
    });
  };
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
