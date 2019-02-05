import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import {connect} from 'react-redux';

const required = value => (value ? undefined : '*Required');

const RenderField = ({
  input,
  type,
  placeholder,
  meta: { touched, error, warning }
}) => (
  <div>
    <input {...input}
      placeholder={placeholder}
      type={type}
      className="admin_form__field"
    />
    {touched &&
      ((error && <span className="form_error">{error}</span>) ||
        (warning && <span className="form_error">{warning}</span>))}
  </div>
);

class ScheduleForm extends React.Component {
  render() {
    const { handleSubmit,
      error,
    } = this.props;

    return (
      <form onSubmit={handleSubmit} autoComplete="off" className="admin_form">

        <div className="admin_form__header">
          Monday
        </div>
        <div className="spacing_bottom">
          <Field
            name="monTime"
            component={RenderField}
            type="text"
            validate={[required]}
            placeholder="time"
          />
        </div>
        <div className="spacing_bottom">
          <Field
            name="monDescription"
            component={RenderField}
            type="text"
            placeholder="description"
          />
        </div>

        <div className="admin_form__header">
          Tuesday
        </div>
        <div className="spacing_bottom">
          <Field
            name="tuesTime"
            component={RenderField}
            type="text"
            validate={[required]}
            placeholder="time"
          />
        </div>
        <div className="spacing_bottom">
          <Field
            name="tuesDescription"
            component={RenderField}
            type="text"
            placeholder="description"
          />
        </div>

        <div className="admin_form__header">
          Wednesday
        </div>
        <div className="spacing_bottom">
          <Field
            name="wedTime"
            component={RenderField}
            type="text"
            validate={[required]}
            placeholder="time"
          />
        </div>
        <div className="spacing_bottom">
          <Field
            name="wedDescription"
            component={RenderField}
            type="text"
            placeholder="description"
          />
        </div>

        <div className="admin_form__header">
          Thursday
        </div>
        <div className="spacing_bottom">
          <Field
            name="thursTime"
            component={RenderField}
            type="text"
            validate={[required]}
            placeholder="time"
          />
        </div>
        <div className="spacing_bottom">
          <Field
            name="thursDescription"
            component={RenderField}
            type="text"
            placeholder="description"
          />
        </div>

        <div className="admin_form__header">
          Friday
        </div>
        <div className="spacing_bottom">
          <Field
            name="friTime"
            component={RenderField}
            type="text"
            validate={[required]}
            placeholder="time"
          />
        </div>
        <div className="spacing_bottom">
          <Field
            name="friDescription"
            component={RenderField}
            type="text"
            placeholder="description"
          />
        </div>

        <div className="admin_form__header">
          Saturday
        </div>
        <div className="spacing_bottom">
          <Field
            name="satTime"
            component={RenderField}
            type="text"
            validate={[required]}
            placeholder="time"
          />
        </div>
        <div className="spacing_bottom">
          <Field
            name="satDescription"
            component={RenderField}
            type="text"
            placeholder="description"
          />
        </div>

        <div className="admin_form__header">
          Sunday
        </div>
        <div className="spacing_bottom">
          <Field
            name="sunTime"
            component={RenderField}
            type="text"
            validate={[required]}
            placeholder="time"
          />
        </div>
        <div className="spacing_bottom">
          <Field
            name="sunDescription"
            component={RenderField}
            type="text"
            placeholder="description"
          />
        </div>

        {error && <div className="form_error">{error}</div>}

        <button
          type="submit"
          className="admin_form__button"
        >
          Submit
        </button>

      </form>
    );
  }
}

function mapStateToProps(state, prop){
  return{
    initialValues: {
      name: '',
      image: {
        data: null
      },
    },
  };
}
function mapDispatchToProps(dispatch){
  return {
  };
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('schedule'));

ScheduleForm = reduxForm({
  form: 'schedule',
  enableReinitialize: true,
  onSubmitSuccess: afterSubmit,
})(ScheduleForm);

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleForm);
