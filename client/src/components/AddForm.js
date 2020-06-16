import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FloatButon } from '../components/index.component'
import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, FormFeedback , Alert} from 'reactstrap'
import { Formik } from "formik";
import moment from 'moment';
import * as Yup from 'yup';
import {savePop}from '../actions';

class AddFormComponent extends Component {

    componentDidUpdate() {
        const { error, saved,attempting } = this.props;
        if (error && this.bag) {
            console.log(this.bag);
        }
        if(saved){
            this.bag.resetForm();
        }
        console.log('Saved AddForm ' + saved);
        console.log('Attempting AddForm ' + attempting);
    };

    _handleFormSubmit(values, bag) {
        this.props.savePop(values);
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
        const now =moment().format('YYYY-MM-DD')
        console.log(now)
        return (
            <div>
                <FloatButon onClick={this.toggle} />
                <Modal isOpen={this.state.modal} toggle={this.state.toggle}>
                    <ModalHeader toggle={this.toggle}>Ajouter Prestation</ModalHeader>
                    <ModalBody>
                    {this._renderErrorIfAny()}
                        <Formik
                            initialValues={{
                            popname: "", 
                            zone: "",
                            ville: "",
                            createat:now
                            }}
                            onSubmit={this._handleFormSubmit.bind(this)}
                            validationSchema={Yup.object().shape({
                                popname:Yup.string().min(8).required(),
                                zone:Yup.string().min(4),
                                ville:Yup.string().min(5),
                                createat:Yup.date(),
                            })}
                            render={({ 
                                errors, 
                                handleBlur, 
                                handleChange, 
                                touched,
                                values,
                                handleSubmit,
                                isValid,}) => (
                                <div>
                                    <FormGroup>
                                        <Label for="popname">Nom POP</Label>
                                        <Input
                                            invalid={errors.popname && touched.popname}
                                            type="text"
                                            name="popname"
                                            placeholder="Entrer nom POP"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.popname}
                                        />
                                        {errors.popname && touched.popname ? (<FormFeedback>{errors.popname}</FormFeedback>) : null}

                                        <Label for="zone">Zone</Label>
                                        <Input
                                            invalid={errors.zone && touched.zone}
                                            type="text"
                                            name="zone"
                                            placeholder="Entrer Zone"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.zone}
                                        />
                                        {errors.zone && touched.zone ? (<FormFeedback>{errors.zone}</FormFeedback>) : null}

                                        <Label for="ville">Ville</Label>
                                        <Input
                                            invalid={errors.ville && touched.ville}
                                            type="text"
                                            name="ville"
                                            placeholder="Entrer ville"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.ville}
                                        />
                                        {errors.ville && touched.ville ? (<FormFeedback>{errors.ville}</FormFeedback>) : null}

                                        <Label for="createat">Date</Label>
                                        <Input
                                            invalid={errors.createat && touched.createat}
                                            type="date"
                                            name="createat"
                                            placeholder="Entrer date Prestation"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.createat}
                                        />
                                        {errors.createat && touched.createat ? (<FormFeedback>{errors.createat}</FormFeedback>) : null}
                                    </FormGroup>
                                    <Button color="primary" onClick={handleSubmit} disabled={!isValid || this.props.attempting}>Save POP</Button>
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
const mapStateToProps = ({ pop }) => {
    return {
        saved: pop.saved,
        attempting: pop.attempting,
        error: pop.error
    };
};

const AddForm = connect(mapStateToProps,{savePop})(AddFormComponent)
export { AddForm }