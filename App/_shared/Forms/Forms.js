import React from "react";
import { visibleWhenFilter } from "./VisibleWhenFilter";
import { styles } from "./Forms.styles";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withState, compose, lifecycle } from "recompose";
import RichTextEditor from "react-rte";
import moment from "moment";
import ClientNotification from "../ClientNotification/ClientNotification";
import Autocomplete from "../Autocomplete/Autocomplete";
import {
  EditableArray,
  TextFieldInput,
  SelectInput,
  GalleryInput,
  ImageFileInput,
  CheckboxInput
} from "./Inputs";
import * as yup from "yup"; // for everything

const enhance = compose(
  withState(
    "textEditorValue",
    "setTextEditorValue",
    RichTextEditor.createEmptyValue()
  ),
  withState("timeoutValue", "setTimeoutValue", null),
  withState("currentGalleryIndex", "setCurrentGalleryIndex", 0),
  withState("editableArray", "setEditableArray", {}),
  lifecycle({
    componentDidMount() {
      let { values, editableArray, setEditableArray, form } = this.props;
      if (form) {
        form &&
          form.fields.map(field => {
            if (field.type === "array") {
              setEditableArray({
                ...editableArray,
                [field.name]: values[field.name]
              });
            }
          });
      }
    },
    componentWillReceiveProps(nextProps) {
      let { values, editableArray, setEditableArray } = this.props;
      let { form } = nextProps;
      if (nextProps.form !== this.props.form) {
        form &&
          form.fields.map(field => {
            if (field.type === "array") {
              setEditableArray({
                ...editableArray,
                [field.name]: values[field.name]
              });
            }
          });
      }
    }
  })
);

const Fields = enhance(
  ({
    form,
    setFieldValue,
    errors,
    touched,
    handleBlur,
    setFieldTouched,
    values,
    media,
    onMediaDrop,
    onGalleryDrop,
    onMediaDelete,
    gallery,
    textEditorValue,
    setTextEditorValue,
    timeoutValue,
    setTimeoutValue,
    currentGalleryIndex,
    setCurrentGalleryIndex,
    editableArray,
    setEditableArray,
    isSubmitting,
    theme,
    classes,
    onRefGet,
    onRefCreate,
    onRefUpdate,
    onRefDelete,
    ...rest
  }) => {
    if (form) {
      let fieldsView = form.fields.map((field, index) => {
        let falseDecisions = visibleWhenFilter(
          field,
          ["visibleWhen", "notVisibleWhen"],
          [true, false],
          values
        );
        if (falseDecisions.length > 0) {
          return;
        }
        return (
          <CardContent key={field.name} style={{ margin: "3em" }}>
            {(field.type === "text" ||
              field.type === "number" ||
              field.type === "password" ||
              field.type === "email") && (
              <TextFieldInput
                field={field}
                value={values[field.name]}
                type={field.type}
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
              />
            )}
            {field.type === "select" && (
              <SelectInput
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                field={field}
                values={values}
                type={field.type}
              />
            )}
            {field.type === "checkbox" && (
              <CheckboxInput
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                field={field}
                type={field.type}
                checked={values && values[field.name]}
              />
            )}

            {field.type === "date" && (
              <div>
                <TextFieldInput
                  type="date"
                  value={moment(values[field.name]).format("YYYY-MM-DD")}
                  field={field}
                  InputProps={{ shrink: true }}
                />
              </div>
            )}
            {field.type === "datetime" && (
              <div>
                <TextFieldInput
                  type="datetime-local"
                  value={moment(values[field.name]).format("YYYY-MM-DDThh:mm")}
                  field={field}
                  InputProps={{ shrink: true }}
                />
              </div>
            )}
            {field.type === "text-editor" && (
              <div>
                <RichTextEditor
                  value={textEditorValue}
                  onChange={value => {
                    setTextEditorValue(value);
                    if (timeoutValue) {
                      clearTimeout(timeoutValue);
                    }
                    let timeout = setTimeout(() => {
                      setFieldValue(field.name, value.toString("html"));
                    }, 1000);
                    setTimeoutValue(timeout);
                  }}
                />
                {values[field.name]}
              </div>
            )}
            {field.type === "array" && (
              <EditableArray
                editableArray={editableArray}
                setEditableArray={setEditableArray}
                field={field}
                setFieldValue={setFieldValue}
              />
            )}
            {field.type === "image" && (
              <ImageFileInput
                onMediaDrop={onMediaDrop}
                media={media}
                field={field}
              />
            )}
            {field.type === "gallery" && (
              <GalleryInput
                gallery={gallery}
                onMediaDelete={onMediaDelete}
                setCurrentGalleryIndex={setCurrentGalleryIndex}
                currentGalleryIndex={currentGalleryIndex}
                field={field}
                onGalleryDrop={onGalleryDrop}
              />
            )}
            {field.type === "ref" && (
              <Autocomplete
                placeholder={field.placeholder}
                onSelect={suggestion => {
                  onRefGet(field.name).then(refs => {
                    if (refs.indexOf(suggestion._id) > -1) {
                      setFieldValue(field.name, [...refs._id, suggestion._id]);
                    }
                  });
                }}
                loadSuggestions={text => {
                  return onRefGet(field.name);
                }}
              />
            )}
            {errors[field.name] && touched[field.name] && (
              <p>{errors[field.name]}</p>
            )}
          </CardContent>
        );
      });
      let notifications = Object.keys(errors).map(k => {
        return {
          message: `${k}: ${errors[k]}`,
          type: "error"
        };
      });
      return (
        <Card>
          {notifications.length > 0 && (
            <ClientNotification
              notifications={(notifications.length > 0 && notifications) || []}
              handleClose={() => {}}
            />
          )}
          {fieldsView}
        </Card>
      );
    }
    return <CircularProgress />;
  }
);

export const FormFields = withStyles(styles, { withTheme: true })(Fields);
