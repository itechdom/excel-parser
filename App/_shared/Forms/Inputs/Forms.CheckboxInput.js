import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const CheckboxInput = ({ setFieldValue, field, checked }) => (
  <FormControlLabel
    control={
      <Checkbox
        id={field.name}
        onChange={event => {
          setFieldValue(field.name, event.target.checked);
        }}
        checked={checked}
      />
    }
    label={field.placeholder}
  />
);
export default CheckboxInput;
