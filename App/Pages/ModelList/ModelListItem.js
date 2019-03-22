import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { ConfirmDeleteModal } from "../_shared/ConfirmDeleteModal";

const ModelListItem = ({
  classes,
  open,
  setOpen,
  model,
  deleteModel,
  setDeletedModel,
  deletedModel,
  match,
  history
}) => (
  <>
    <ListItem className={classes.listItemContainer} key={model._id}>
      {model.image ? <Avatar src={`${model.image}`} /> : <Avatar />}
      <ListItemText>
        <Typography>{model.name || model.title}</Typography>
      </ListItemText>
      <ListItemIcon
        onClick={() => {
          history.push(`${match.url}/view/${model._id}`);
        }}
      >
        <Button>view</Button>
      </ListItemIcon>
      <ListItemIcon>
        <IconButton
          onClick={() => {
            history.push(`${match.url}/edit/${model._id}`);
          }}
        >
          <EditIcon />
        </IconButton>
      </ListItemIcon>
      <ListItemIcon>
        <IconButton
          onClick={() => {
            setDeletedModel(model, () => {
              setOpen(true);
            });
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemIcon>
    </ListItem>
    <ConfirmDeleteModal
      open={open}
      setOpen={setOpen}
      onConfirm={() => {
        deleteModel(deletedModel).then(() => {
          setOpen(false);
        });
      }}
    />
  </>
);

export default ModelListItem;
