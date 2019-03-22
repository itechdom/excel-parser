import React from "react";
import { toJS } from "mobx";
import { Formik } from "formik";
import Button from "@material-ui/core/Button";
import { FormFields } from "../../_shared/Forms/Forms";
import { validate } from "../../_shared/Forms/Forms.Validate";

export default class ModelEdit extends React.Component {
  componentWillReceiveProps(nextProps) {}
  componentDidMount() {}
  render() {
    let {
      model,
      modelSchema,
      onSave,
      onCancel,
      form,
      uploadMedia,
      deleteMedia,
      onMediaUploadComplete,
      onGalleryUploadComplete,
      onMediaDeleteComplete,
      onGalleryDeleteComplete,
      uploadGallery,
      gallery,
      media,
      ...rest
    } = this.props;
    return (
      <div style={{ flex: 1 }}>
        <Formik
          onSubmit={(values, actions) => {
            console.log("values", values);
            onSave(model, values);
          }}
          initialValues={toJS(model)}
          enableReinitialize={true}
          validate={(values, props) => {
            let errors;
            errors = validate(values, form, modelSchema);
            return errors;
          }}
          render={({
            values,
            errors,
            touched,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            setFieldTouched
          }) => {
            return (
              <form id="edit-form">
                <FormFields
                  id="edit-fields"
                  form={form}
                  errors={errors}
                  modelSchema={modelSchema}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  values={values}
                  touched={touched}
                  media={model && model.image}
                  tempMedia={media}
                  gallery={model && model.gallery}
                  tempGallery={gallery}
                  isSubmitting={isSubmitting}
                  onMediaDrop={(acceptedFiles, rejectedFiles) => {
                    uploadMedia(model._id, acceptedFiles).then(res => {
                      onMediaUploadComplete(model, res.data);
                    });
                  }}
                  onGalleryDrop={(acceptedFiles, rejectedFiles) => {
                    uploadGallery(model._id, acceptedFiles).then(res => {
                      onGalleryUploadComplete(model, res.data);
                    });
                  }}
                  onMediaDelete={(image, index, isMultiple) => {
                    deleteMedia(model._id, image).then(() => {
                      if (isMultiple) {
                        onGalleryDeleteComplete(model, image, index);
                      }
                      onMediaDeleteComplete(model, image);
                    });
                  }}
                  {...rest}
                />
                <Button
                  id="edit-save"
                  onClick={event => {
                    handleSubmit(event);
                  }}
                >
                  <p>Save</p>
                </Button>
                <Button
                  id="edit-cancel"
                  onClick={event => {
                    onCancel(event);
                  }}
                >
                  Cancel
                </Button>
              </form>
            );
          }}
        />
      </div>
    );
  }
}
