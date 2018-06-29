import React from 'react'
import DefaultInput from '../../ui-inputs/DefaultInputLayout';
import PropTypes from 'prop-types';
import { Form, Field } from 'formik';
import SubmitButton from '../../buttons/SubmitButton';
import { InputFeedback } from '../../text/InputFeedback';


export const InnerForm = ({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, dirty }) => (
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
        <SubmitButton disabled={!dirty || isSubmitting || errors.email} ></SubmitButton>
    </Form>
)

InnerForm.propTypes = {
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    values: PropTypes.any.isRequired,
    errors: PropTypes.any.isRequired,
    touched: PropTypes.any.isRequired,
    dirty: PropTypes.bool
}

