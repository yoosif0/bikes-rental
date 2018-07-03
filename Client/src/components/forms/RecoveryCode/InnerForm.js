import React from 'react'
import DefaultInput from '../../ui-inputs/DefaultInputLayout';
import { Form, Field } from 'formik';
import SubmitButton from '../../buttons/SubmitButton';
import { InputFeedback } from '../../text/InputFeedback';


export const InnerForm = ({ errors, touched, isSubmitting, dirty }) => (
    <Form>
        <DefaultInput label="Email">
            <Field type="text" name="email" className="form-control" />
            <InputFeedback error={touched.email && errors.email} />
        </DefaultInput>

        <DefaultInput label="Recovery Code">
            <Field type="text" name="recoveryCode" className="form-control" />
            <InputFeedback error={touched.recoveryCode && errors.recoveryCode} />
        </DefaultInput>
        <DefaultInput label="Password">
            <Field type="password" name="newPassword" className="form-control" />
            <InputFeedback error={touched.newPassword && errors.newPassword} />
        </DefaultInput>
        <DefaultInput label="Confirm Password">
            <Field type="password" name="confirmPassword" className="form-control" />
            <InputFeedback error={touched.confirmPassword && errors.confirmPassword} />
        </DefaultInput>
        <SubmitButton disabled={!dirty || isSubmitting || Object.keys(errors).length} ></SubmitButton>
    </Form>
)

