import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";


import { signIn } from '../actions';

class LoginPage extends Component {
  _handleFormSubmit(values) {
    this.props.signIn(values);
  }
  render() {
    return (
      <div style={{ padding: 20 }}>
        <h3>Accéder a votre compte</h3>
        <hr />
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={this._handleFormSubmit.bind(this)}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .min(6)
              .email()
              .required(),
            password: Yup.string()
              .min(8)
              .max(50)
              .required()
          })}
          render={({
            handleChange,
            handleSubmit,
            isValid,
            isSubmitting,
            handleBlur,
            errors,
            touched
          }) => (
              <div>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    invalid={errors.email && touched.email}
                    type="email"
                    name="email"
                    placeholder="Entrer votre E-mail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (<FormFeedback>{errors.email}</FormFeedback>) : null}
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    invalid={errors.password && touched.password}
                    type="password"
                    name="password"
                    placeholder="Entrer votre password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? (<FormFeedback>{errors.password}</FormFeedback>) : null}
                </FormGroup>
                <Button color="primary" size="md" onClick={handleSubmit} disabled={!isValid || isSubmitting}>
                  Connexion
              </Button>
              </div>
            )}
        />
        <span>Vous n'avez spanas un compte? <Link to='/signup'>Inscrivez-vous</Link></span>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    attempting : auth.attempting,
    error: auth.error
  };
};
const Login = connect(mapStateToProps, { signIn })(LoginPage);
export { Login };
