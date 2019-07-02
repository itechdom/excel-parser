import React from "react";
//Routing
import { Route } from "react-router-dom";
//Material UI imports
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import CircularProgress from "@material-ui/core/CircularProgress";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import { styles } from "./ModelList.styles";
import { withStyles } from "@material-ui/core/styles";
//recompose
import { withState, compose } from "recompose";
//Different template pages
import ModelAdd from "../ModelAdd/ModelAdd";
import ModelEdit from "../ModelEdit/ModelEdit";
import ModelPreview from "../ModelPreview/ModelPreview";
import ModelListItem from "./ModelListItem";
//shared components
import FloatingAddButton from "../../_shared/FloatingAddButton/FloatingAddButton";
import ClientNotification from "../../_shared/ClientNotification/ClientNotification";
import Autocomplete from "../../_shared/Autocomplete/Autocomplete";
import Table from "../../_shared/Table/Table";

const enhance = compose(
  withState("open", "setOpen", false),
  withState("deletedModel", "setDeletedModel", {})
);

const ModelList = enhance(
  ({
    modelArray,
    modelSchema,
    columns,
    createModel,
    modelName,
    updateModel,
    deleteModel,
    searchModel,
    uploadMedia,
    gallery,
    uploadGallery,
    addToGallery,
    removeFromGallery,
    addToMedia,
    removeFromMedia,
    deleteMedia,
    media,
    match,
    history,
    classes,
    form,
    notifications,
    saveNotification,
    removeNotification,
    ModelListPage,
    ModelEditPage,
    ModelAddPage,
    modelKey,
    open,
    setOpen,
    deletedModel,
    setDeletedModel,
    hideAddButton,
    ...rest
  }) => {
    let models = modelArray;
    let modelsView = <CircularProgress color="secondary" />;
    if (models && models.length > 0) {
      modelsView = models.map((model, index) => {
        return (
          !model.deleted && (
            <>
              <ModelListItem
                classes={classes}
                match={match}
                open={open}
                setOpen={setOpen}
                model={model}
                deleteModel={deleteModel}
                setDeletedModel={setDeletedModel}
                deletedModel={deletedModel}
                history={history}
              />
              {index < models.length - 1 ? <Divider /> : ""}
            </>
          )
        );
      });
    }
    return (
      <div className={classes.root}>
        <Route
          exact
          path={`${match.path}/add`}
          render={({ match }) => {
            return (
              <ModelAdd
                model={{}}
                form={form}
                modelSchema={modelSchema}
                onSave={values => {
                  createModel(values);
                }}
                onCancel={() => {
                  history.goBack();
                }}
                {...rest}
              />
            );
          }}
        />
        <Route
          path={`${match.path}/edit/:id`}
          render={({ match }) => {
            return (
              <ModelEdit
                onCancel={() => {
                  history.goBack();
                }}
                onSave={(updatedModel, values) => {
                  updateModel(updatedModel, values);
                }}
                form={form}
                modelSchema={modelSchema}
                model={
                  models &&
                  models.length > 0 &&
                  models.find(({ _id }) => _id === match.params.id)
                }
                media={media}
                gallery={
                  gallery &&
                  gallery.length > 0 &&
                  gallery.filter(({ modelId }) => modelId === match.params.id)
                }
                uploadMedia={uploadMedia}
                uploadGallery={uploadGallery}
                addToGallery={addToGallery}
                removeFromGallery={removeFromGallery}
                addToMedia={addToMedia}
                deleteMedia={deleteMedia}
                removeFromMedia={removeFromMedia}
                onMediaUploadComplete={(model, media) => {
                  updateModel(model, { image: `${media}&q=${Date.now()}` });
                }}
                onGalleryUploadComplete={(model, media) => {
                  updateModel(model, { gallery: [...model.gallery, ...media] });
                }}
                onMediaDeleteComplete={(model, media) => {
                  updateModel(model, { image: `` });
                }}
                onGalleryDeleteComplete={(model, index) => {
                  model.gallery.remove(index);
                  updateModel(model, { gallery: model.gallery });
                }}
                {...rest}
              />
            );
          }}
        />
        <Route
          path={`${match.path}view/:id`}
          render={({ match }) => {
            return (
              <ModelPreview
                onEdit={model => {
                  history.push(`/${modelName}/edit/${model._id}`);
                }}
                deleteModel={deleteModel}
                onDelete={() => {
                  history.push(`/${modelName}`);
                }}
                form={form}
                model={
                  models &&
                  models.length > 0 &&
                  models.find(({ _id }) => _id === match.params.id)
                }
                {...rest}
              />
            );
          }}
        />
        <Route
          exact
          path={`${match.path}`}
          render={props => {
            return (
              <React.Fragment>
                <header>
                  <AppBar position="static">
                    <Toolbar>
                      <Autocomplete
                        placeholder="Search…"
                        onSelect={suggestion => {
                          history.push(`/view/${suggestion._id}`);
                        }}
                        loadSuggestions={text => {
                          let query = {
                            [modelKey]: { $regex: event.target.value }
                          };
                          return searchModel(query);
                        }}
                      />
                    </Toolbar>
                  </AppBar>
                </header>
                {models && models.length > 0 && (
                  <Table
                    title={modelName}
                    columns={columns.map((col, i) => {
                      return {
                        label: col,
                        id: col
                      };
                    })}
                    rows={models}
                  />
                )}
                {/* <Paper className={classes.listContainer}>
                  <List>{modelsView}</List>
                </Paper> */}
                {hideAddButton ? (
                  ""
                ) : (
                  <FloatingAddButton
                    onClick={event => history.push(`${match.path}/add`)}
                  />
                )}
              </React.Fragment>
            );
          }}
        />
        <ClientNotification
          notifications={notifications}
          handleClose={(event, reason, notification) => {
            removeNotification(notification);
          }}
        />
      </div>
    );
  }
);

export default withStyles(styles)(ModelList);
