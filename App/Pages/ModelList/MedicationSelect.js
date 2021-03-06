import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default function MedicationSelect(props) {
  const classes = useStyles();
  const [type, setType] = React.useState("ALL");
  const [open, setOpen] = React.useState(false);
  function handleChange(event) {
    props.onSelect(event.target.value);
    setType(event.target.value);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }
  return (
    <form
      style={{ right: "6px", position: "relative" }}
      autoComplete="off"
    >
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="demo-controlled-open-select">
          Medication Type
        </InputLabel>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={type}
          onChange={handleChange}
          inputProps={{
            name: "type",
            id: "demo-controlled-open-select"
          }}
        >
          <MenuItem value={"ALL"}>All</MenuItem>
          {props.list &&
            props.list.map(type => {
              return <MenuItem value={type}>{type}</MenuItem>;
            })}
        </Select>
      </FormControl>
    </form>
  );
}
