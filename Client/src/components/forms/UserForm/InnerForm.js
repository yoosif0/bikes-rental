import React from 'react'
import DefaultInput from '../../ui-inputs/DefaultInputLayout';
import SubmitButton from '../../buttons/SubmitButton';
import { Form, Field } from 'formik';
import { InputFeedback } from '../../text/InputFeedback';

export const InnerForm = ({ errors, touched, isSubmitting, dirty }) => (
    <Form>
        <DefaultInput label="Name">
            <Field type="text" name="name" className="form-control" />
            <InputFeedback error={touched.name && errors.name} />
        </DefaultInput>
        <DefaultInput label="Email">
            <Field type="text" name="email" className="form-control" />
            <InputFeedback error={touched.email && errors.email} />
        </DefaultInput>
        <DefaultInput label="Role">
            <Field component="select" name="role" className="form-control">
                <option value="manager">manager</option>
                <option value="regular">regular</option>
            </Field>
            <InputFeedback error={touched.color && errors.color} />
        </DefaultInput>

        <SubmitButton disabled={!dirty || isSubmitting || Object.keys(errors).length} ></SubmitButton>
    </Form>
)


