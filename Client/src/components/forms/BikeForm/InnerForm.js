import React from 'react'
import DefaultInput from '../../ui-inputs/DefaultInputLayout';
import { Form, Field } from 'formik';
import { InputFeedback } from '../../text/InputFeedback';

export const InnerForm = ({ touched, errors, values, children, isSubmitting }) => (
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
        <DefaultInput label="Is Available">
            <div className="form-check">
                <Field checked={values.isAvailable} className="form-check-input" type="checkbox" name="isAvailable" />
            </div>
        </DefaultInput>
        {children(() => isSubmitting || Object.keys(errors).length)}
    </Form>

)
