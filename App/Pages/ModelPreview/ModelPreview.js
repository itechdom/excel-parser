import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ImageGallery from "react-image-gallery";
import { ConfirmDeleteModal } from "../_shared/ConfirmDeleteModal";
import "react-image-gallery/styles/css/image-gallery.css";

import { withState, compose } from "recompose";
const enhance = compose(withState("open", "setOpen", false));

const ModelPreview = enhance(
  ({ model, onEdit, form, open, setOpen, deleteModel, onDelete }) => {
    console.log("model", model);
    if (form && model) {
      let previewList = form.fields.map(field => {
        if (
          field.type === "text" ||
          field.type === "number" ||
          field.type === "checkbox"
        ) {
          return (
            <ListItem>
              <Typography variant="h6" component="h6">
                {field.placeholder}:
              </Typography>
              <Typography style={{ paddingLeft: "10px" }}>
                {model[field.name]}
              </Typography>
            </ListItem>
          );
        }
        if (field.type === "select") {
          return (
            <ListItem>
              <Typography variant="h6" component="h6">
                {field.placeholder}
              </Typography>
              <Typography>
                {model[`${field.name}Value`]
                  ? model[`${field.name}Value`]
                  : model[`${field.name}`]}
              </Typography>
            </ListItem>
          );
        }
        if (field.type === "email") {
          return (
            <ListItem>
              <Typography>
                {field.placeholder}: {model[field.name]}
              </Typography>
            </ListItem>
          );
        }
        if (field.type === "password") {
          return (
            <ListItem>
              <Typography>
                {field.placeholder}: {model[field.name]}
              </Typography>
            </ListItem>
          );
        }
        if (field.type === "datetime" || field.type === "date") {
          return (
            <ListItem>
              <Typography>
                {field.placeholder}: {model[field.name]}
              </Typography>
            </ListItem>
          );
        }
        if (field.type === "text-editor") {
          return (
            <ListItem>
              <Typography>
                {field.placeholder}: {model[field.name]}
              </Typography>
            </ListItem>
          );
        }
      });
      return (
        <>
          <Card style={{ flex: 1 }}>
            <CardHeader
              title={model.title || model.name}
              action={
                <>
                  <IconButton
                    onClick={() => {
                      onEdit(model);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            />
            <CardContent>
              <List>{previewList}</List>
            </CardContent>
            {model.image && (
              <>
                <Typography>Main Image</Typography>
                <CardMedia
                  component="img"
                  alt={model.title || model.name}
                  image={model.image}
                  title="Contemplative Reptile"
                />
              </>
            )}
            {model.gallery && (
              <>
                <Typography>Gallery</Typography>
                {model.gallery.length > 0 ? (
                  <ImageGallery
                    items={model.gallery.map(image => {
                      return {
                        original: image,
                        thumbnail: image
                      };
                    })}
                  />
                ) : (
                  ""
                )}
              </>
            )}
          </Card>
          <ConfirmDeleteModal
            open={open}
            setOpen={setOpen}
            onConfirm={() => {
              deleteModel(model).then(() => {
                setOpen(false);
                onDelete();
              });
            }}
          />
        </>
      );
    }
    return <></>;
  }
);

export default ModelPreview;
