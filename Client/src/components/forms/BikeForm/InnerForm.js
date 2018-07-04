import React from 'react'
import DefaultInput from '../../ui-inputs/DefaultInputLayout';
import SubmitButton from '../../buttons/SubmitButton';
import { Form, Field } from 'formik';
import { InputFeedback } from '../../text/InputFeedback';

export class InnerForm extends React.Component{

    render() {
        return(
            <Form>
            <DefaultInput label="Model">
                <Field type="text" name="model" className="form-control" />
                <InputFeedback error={this.props.touched.model && this.props.errors.model} />
            </DefaultInput>
            <DefaultInput label="Weight in kg">
                <Field type="number" name="weight" className="form-control" />
                <InputFeedback error={this.props.touched.weight && this.props.errors.weight} />
            </DefaultInput>
            <DefaultInput label="Color">
                <Field component="select" name="color" className="form-control">
                    <option value=""></option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="black">Black</option>
                    <option value="yellow">Yellow</option>
                    <option value="green">Green</option>
                    <option value="white">White</option>
                </Field>
                <InputFeedback error={this.props.touched.color && this.props.errors.color} />
            </DefaultInput>
            <DefaultInput label="Is Available">
                <div className="form-check">
                    <Field checked={this.props.values.isAvailable} className="form-check-input" type="checkbox" name="isAvailable" />
                </div>
            </DefaultInput>
            <SubmitButton disabled={(!this.props.dirty && !this.props.hasAddrressUpdatedWhileEditing) || !this.props.isThereAddress || this.props.isSubmitting || Object.keys(this.props.errors).length} ></SubmitButton>
        </Form>

        )
    }
}  