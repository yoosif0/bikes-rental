import React from 'react'
import DefaultInput from '../../ui-inputs/DefaultInputLayout';
import SubmitButton from '../../buttons/SubmitButton';
import { Form, Field } from 'formik';
import { InputFeedback } from '../../text/InputFeedback';

export const InnerForm = ({ errors, touched, isSubmitting, dirty }) => (
    <Form>
        <DefaultInput label="Model">
            <Field type="text" name="model" className="form-control" />
            <InputFeedback error={touched.model && errors.model} />
        </DefaultInput>
        <DefaultInput label="Weight in kg">
            <Field type="number" name="weight" className="form-control" />
            <InputFeedback error={touched.weight && errors.weight} />
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
            <InputFeedback error={touched.color && errors.color} />
        </DefaultInput>
        <DefaultInput label="latitude">
            <Field type="number" name="latitude" className="form-control" />
            <InputFeedback error={touched.latitude && errors.latitude} />
        </DefaultInput>
        <DefaultInput label="longitude">
            <Field type="number" name="longitude" className="form-control" />
            <InputFeedback error={touched.longitude && errors.longitude} />
        </DefaultInput>
        <SubmitButton disabled={!dirty || isSubmitting || Object.keys(errors).length} ></SubmitButton>
    </Form>
)