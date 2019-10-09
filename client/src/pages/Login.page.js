import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input, FormFeedback, Alert } from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";


import { signIn } from '../actions';

class LoginPage extends Component {

  componentDidUpdate() {
    const { error , isAuth} = this.props;
    if (error && this.bag) {
      this.bag.setSubmitting(false);
    }
    console.log(isAuth);
    if(isAuth){
      this.props.history.push('/');
    }
  };

  _handleFormSubmit(values, bag) {
    this.props.signIn(values);
    this.bag = bag;
  }
  _renderErrorIfAny() {
    const { error } = this.props;
    if (error) {
      return (
        <Alert color="danger">{error}</Alert>
      );
    }
  }
  render() {
    return (
      <div style={{ padding: 20 }}>
        <h3>Accéder a votre compte</h3>
        <hr />

        {this._renderErrorIfAny()}

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
    attempting: auth.attempting,
    error: auth.error,
    isAuth: auth.isAuth
  };
};
const Login = connect(mapStateToProps, { signIn })(LoginPage);
export { Login };
