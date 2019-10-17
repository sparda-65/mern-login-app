import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";

import { signUp } from '../actions';

class SignUpPage extends Component {
    _handleFormSubmit(values, bag) {
        this.props.signUp(values);
        this.bag = bag;
    }
    render() {
        return (
            <div style={{ padding: 20 }}>
                <h3>Créer un nouveau compte</h3>
                <hr />
                <Formik
                    initialValues={{ username: "", email: "", password: "" }}
                    onSubmit={this._handleFormSubmit.bind(this)}
                    validationSchema={Yup.object().shape({
                        username: Yup.string()
                            .min(6)
                            .required(),
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
                                    <Label for="username">username</Label>
                                    <Input
                                        invalid={errors.username && touched.username}
                                        type="username"
                                        name="username"
                                        placeholder="Entrer votre username"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.username && touched.username ? (<FormFeedback>{errors.username}</FormFeedback>) : null}
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email</Label>
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
                                    <Label for="password">Password</Label>
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
                                    Créer un Compte
                                </Button>
                            </div>
                        )}
                />
                <span>Vous avez dèja un compte <Link to='/login'>connectez-vous</Link></span>
            </div>
        );
    }
}

const mapStateToProps = ({ register }) => {
    return {
      attempting: register.attempting,
      error: register.error,
    };
  };
  const SignUp = connect(mapStateToProps, { signUp })(SignUpPage);

export { SignUp };