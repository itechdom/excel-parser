import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const EditableArray = ({
  field,
  setFieldValue,
  setEditableArray,
  editableArray
}) => {
  if (
    !editableArray[field.name] ||
    editableArray[field.name].length === 0 ||
    editableArray[field.name].length === 1
  ) {
    return (
      <>
        <TextField
          id={`${field.name}-0`}
          label={field.placeholder}
          type="text"
          value={editableArray[field.name] && editableArray[field.name][0]}
          onChange={event => {
            let newState = {
              ...editableArray,
              [field.name]: [event.target.value]
            };
            setEditableArray(newState, () => {
              setFieldValue(field.name, newState[field.name]);
            });
          }}
        />
        <Button
          onClick={() => {
            setEditableArray({
              ...editableArray,
              [field.name]: [...editableArray[field.name], ""]
            });
          }}
        >
          add
        </Button>
      </>
    );
  }
  return (
    <>
      {editableArray[field.name].map((item, i) => (
        <>
          <TextField
            id={`${field.name}-${i}`}
            label={field.placeholder}
            value={editableArray[field.name][i]}
            type="text"
            onChange={event => {
              let newState = {
                ...editableArray,
                [field.name]: editableArray[field.name].map((e, index) => {
                  if (i === index) {
                    return event.target.value;
                  }
                  return editableArray[field.name][index];
                })
              };
              setEditableArray(newState, () => {
                setFieldValue(field.name, newState[field.name]);
              });
            }}
          />
          <Button
            onClick={() => {
              setEditableArray({
                ...editableArray,
                [field.name]: [...editableArray[field.name], ""]
              });
            }}
          >
            add
          </Button>
          <Button
            onClick={() => {
              let newState = {
                ...editableArray,
                [field.name]: editableArray[field.name].filter((e, index) => {
                  if (i === index) {
                    return false;
                  }
                  return e;
                })
              };
              setEditableArray(newState);
              setFieldValue(field.name, newState[field.name]);
            }}
          >
            remove
          </Button>
        </>
      ))}
    </>
  );
};

export default EditableArray;
