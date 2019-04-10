import React from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const SelectInput = ({ setFieldValue, field, values }) => (
  <div>
    <InputLabel htmlFor="age-simple">{field.placeholder}</InputLabel>
    <Select
      id={field.name}
      value={values[field.name] || ""}
      onChange={event => {
        setFieldValue(field.name, event.target.value);
      }}
      fullWidth={true}
      required={field.required || false}
    >
      {field.options.map((option, index) => {
        return (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        );
      })}
    </Select>
  </div>
);

export default SelectInput;
