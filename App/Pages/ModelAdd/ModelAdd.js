import React from "react";
import { Formik } from "formik";
import Button from "@material-ui/core/Button";
import { FormFields } from "../../_shared/Forms/Forms";
import { validate } from "../../_shared/Forms/Forms.Validate";
import { toJS } from "mobx";

export default class ModelAdd extends React.Component {
  state = {
    initialValues: {}
  };
  componentDidMount() {
    let formKeyVal = {};
    this.props.form &&
      this.props.form.fields.map(field => {
        formKeyVal[field.name] = field.value;
      });
    this.setState({ initialValues: formKeyVal });
  }
  componentWillReceiveProps(nextProps) {}
  render() {
    let { onSave, onCancel, form, modelSchema, ...rest } = this.props;
    return (
      <div style={{ flex: 1 }}>
        <Formik
          onSubmit={(values, actions) => {
            onSave(values);
          }}
          enableReinitialize={true}
          validate={(values, props) => {
            let errors;
            errors = validate(values, form, modelSchema);
            return errors;
          }}
          initialValues={toJS(this.state.initialValues)}
          render={({
            values,
            errors,
            touched,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            setFieldTouched
          }) => {
            return (
              <form id="add-form">
                <FormFields
                  id="add-fields"
                  modelSchema={modelSchema}
                  form={form}
                  errors={errors}
                  isSubmitting={isSubmitting}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  values={values}
                  touched={touched}
                  handleBlur={handleBlur}
                  {...rest}
                />
                <Button
                  id="add-button"
                  onClick={event => {
                    handleSubmit(event);
                  }}
                  // disabled={isSubmitting}
                >
                  <p>Add</p>
                </Button>
                <Button
                  id="add-cancel"
                  onClick={event => {
                    onCancel(event);
                  }}
                  // disabled={isSubmitting}
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
