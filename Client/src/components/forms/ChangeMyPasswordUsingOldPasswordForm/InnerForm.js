import React from 'react'
import DefaultInput from '../../ui-inputs/DefaultInputLayout';
import { Form, Field } from 'formik';
import SubmitButton from '../../buttons/SubmitButton';
import { InputFeedback } from '../../text/InputFeedback';


export const InnerForm = ({ errors, touched, isSubmitting, dirty }) => (
    <Form>
        <DefaultInput label="Old Password">
            <Field type="password" name="oldPassword" className="form-control" />
            <InputFeedback error={touched.oldPassword && errors.oldPassword} />
        </DefaultInput>
        <DefaultInput label="New Password">
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