import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import {connect} from 'react-redux';
import _ from 'lodash';

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

class ScheduleEditForm extends React.Component {
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

function mapStateToProps(state, props){
  const scheduleData = _.find(state.schedule.schedules, {'id': props.id});
  const scheduleDoc = scheduleData ? scheduleData.doc : null;
  return{
    testValue: scheduleData,
    initialValues: {
      id: scheduleDoc ? scheduleDoc._id : null,
      rev: scheduleDoc ? scheduleDoc._rev : null,
      createdAt: scheduleDoc ? scheduleDoc.created_at : null,

      monTime: scheduleDoc ? scheduleDoc.monTime : null,
      monDescription: scheduleDoc ? scheduleDoc.monDescription : null,
      tuesTime: scheduleDoc ? scheduleDoc.tuesTime : null,
      tuesDescription: scheduleDoc ? scheduleDoc.tuesDescription : null,
      wedTime: scheduleDoc ? scheduleDoc.wedTime : null,
      wedDescription: scheduleDoc ? scheduleDoc.wedDescription : null,
      thursTime: scheduleDoc ? scheduleDoc.thursTime : null,
      thursDescription: scheduleDoc ? scheduleDoc.thursDescription : null,
      friTime: scheduleDoc ? scheduleDoc.friTime : null,
      friDescription: scheduleDoc ? scheduleDoc.friDescription : null,
      satTime: scheduleDoc ? scheduleDoc.satTime : null,
      satDescription: scheduleDoc ? scheduleDoc.satDescription : null,
      sunTime: scheduleDoc ? scheduleDoc.sunTime : null,
      sunDescription: scheduleDoc ? scheduleDoc.sunDescription : null,
    },
  };
}
function mapDispatchToProps(dispatch){
  return {
  };
}

ScheduleEditForm = reduxForm({
  form: 'scheduleEdit',
  enableReinitialize: true,
})(ScheduleEditForm);

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleEditForm);
