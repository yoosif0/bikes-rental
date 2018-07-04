import React from 'react'
import DefaultInput from '../../ui-inputs/DefaultInputLayout';
import SubmitButton from '../../buttons/SubmitButton';
import { Form, Field } from 'formik';
import { InputFeedback } from '../../text/InputFeedback';

export const InnerForm = ({ values, errors, touched, isSubmitting, dirty }) => (
    <Form>
        <DefaultInput label="New Address">
            <Field type="test" name="address" className="form-control" placeholder="Enter new address here"/>
            <InputFeedback error={touched.address && errors.address} />
        </DefaultInput>
        <SubmitButton label="Lookup" disabled={!dirty || isSubmitting || Object.keys(errors).length} ></SubmitButton>
    </Form>
)