import React from 'react'
import DefaultInput from '../../ui-inputs/DefaultInputLayout';
import SubmitButton from '../../buttons/SubmitButton';
import { Form, Field } from 'formik';
import { InputFeedback } from '../../text/InputFeedback';

export const InnerForm = ({ errors, touched, isSubmitting, dirty  }) => (
    <Form>
        <DefaultInput label="Model">
            <Field type="text" name="model" className="form-control" />
            <InputFeedback error={touched.model && errors.model} />
        </DefaultInput>
        <DefaultInput label="Minumum Weight">
            <Field type="number" name="minWeight" className="form-control" />
            <InputFeedback error={touched.minWeight && errors.minWeight} />
        </DefaultInput>
        <DefaultInput label="Maximum Weight">
            <Field type="number" name="maxWeight" className="form-control" />
            <InputFeedback error={touched.maxWeight && errors.maxWeight} />
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
        <DefaultInput label="Rate Average">
            <Field component="select" name="avgRate" className="form-control">
                <option value=""></option>
                <option value="z">0+</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
            </Field>
            <InputFeedback error={touched.color && errors.color} />
        </DefaultInput>

        <SubmitButton label="Search" disabled={isSubmitting || Object.keys(errors).length} ></SubmitButton>
    </Form>
)
