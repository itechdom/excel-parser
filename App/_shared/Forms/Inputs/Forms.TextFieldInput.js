import React from "react";
import TextField from "@material-ui/core/TextField";
import { FastField } from "formik";

const TextFieldInput = ({
  type,
  value,
  field,
  setFieldTouched,
  setFieldValue,
  ...rest
}) => {
  return (
    <FastField
      render={({ form }) => {
        return (
          <>
            <TextField
              id={field.name}
              label={field.name}
              type={type}
              value={value}
              onChange={event => {
                setFieldValue(field.name, event.target.value);
              }}
              onBlur={e => {
                setFieldTouched(field.name, true);
              }}
              required={field.required || false}
              fullWidth={true}
              {...rest}
            />
          </>
        );
      }}
    />
  );
};

export default TextFieldInput;
