import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FloatButon } from '../components/index.component'
import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, FormFeedback } from 'reactstrap'
import { Formik } from "formik";
import moment from 'moment';
import * as Yup from 'yup';

class AddFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }
    _onSubmit(values, bag){
        console.log(values);
    }
    render() {
        const now =moment().format('YYYY-MM-DD')
        console.log(now)
        return (
            <div>
                <FloatButon onClick={this.toggle} />
                <Modal isOpen={this.state.modal} toggle={this.state.toggle}>
                    <ModalHeader toggle={this.toggle}>Ajouter Prestation</ModalHeader>
                    <ModalBody>

                        <Formik
                            initialValues={{site: "", date:now}}
                            onSubmit={this._onSubmit.bind(this)}
                            validationSchema={Yup.object().shape({
                                site:Yup.string().min(8).required(),
                                date:Yup.date().required(),
                            })}
                            render={({ 
                                errors, 
                                handleBlur, 
                                handleChange, 
                                touched,
                                values,
                                handleSubmit,
                                isValid,
                                isSubmitting }) => (
                                <div>
                                    <FormGroup>
                                        <Label for="site">POP</Label>
                                        <Input
                                            invalid={errors.site && touched.site}
                                            type="text"
                                            name="site"
                                            placeholder="Entrer nom POP"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.site}
                                        />
                                        {errors.site && touched.site ? (<FormFeedback>{errors.site}</FormFeedback>) : null}
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="date">Date</Label>
                                        <Input
                                            invalid={errors.date && touched.date}
                                            type="date"
                                            name="date"
                                            placeholder="Entrer date Prestation"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.date}
                                        />
                                        {errors.date && touched.date ? (<FormFeedback>{errors.date}</FormFeedback>) : null}
                                    </FormGroup>
                                    <Button color="primary" onClick={handleSubmit} disabled={!isValid || isSubmitting}>Save POP</Button>
                                </div>
                            )}
                        />

                    </ModalBody>
                    {/* <ModalFooter>
                        <Button color="primary" onClick={handleSubmit} disabled={!isValid || isSubmitting}>Save POP</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter> */}
                </Modal>
            </div>
        )
    }
}
const AddForm = connect(null)(AddFormComponent)
export { AddForm }