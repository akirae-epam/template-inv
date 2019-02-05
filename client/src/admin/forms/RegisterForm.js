import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {Button} from 'react-bootstrap';

const renderField = ({
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

const RegisterForm = props => {
  const { handleSubmit, submitting, error } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="spacing_bottom">
        <Field
          name="email"
          placeholder="Username"
          type="text"
          component={renderField}
        />
      </div>
      <div className="spacing_bottom">
        <Field
          name="password"
          placeholder="Password"
          type="password"
          component={renderField}
        />
      </div>
      {error && <strong>{error}</strong>}
      <div className="user_row">
        <Button
          type="submit"
          disabled = {submitting}
          className="admin_form__button"
        >
          Register
        </Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'register',
  enableReinitialize: true,
})(RegisterForm);
