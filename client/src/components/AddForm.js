import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FloatButon } from '../components/index.component'
import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, FormFeedback } from 'reactstrap'
import { Formik } from "formik";

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

    render() {
        return (
            <div>
                <FloatButon onClick={this.toggle} />
                <Modal isOpen={this.state.modal} toggle={this.state.toggle}>
                    <ModalHeader toggle={this.toggle}>Ajouter Prestation</ModalHeader>
                    <ModalBody>

                        <Formik
                            initialValues={{}}
                            render={({ errors, handleBlur, handleChange, touched }) => (
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
                                        />
                                        {errors.date && touched.date ? (<FormFeedback>{errors.date}</FormFeedback>) : null}
                                    </FormGroup>
                                </div>
                            )}
                        />

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
const AddForm = connect(null)(AddFormComponent)
export { AddForm }