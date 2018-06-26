import React from 'react'
import DefaultInput from '../ui-inputs/DefaultInputLayout';
import PropTypes from 'prop-types';
import SubmitButton from '../buttons/SubmitButton';
import { Form, Field } from 'formik';
import { InputFeedback } from '../text/InputFeedback';

export const LoginInnerForm = ({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, dirty }) => (
    <Form>
        <DefaultInput label="Email">
            <Field type="text" name="email" className="form-control" />
            <InputFeedback error={touched.email && errors.email} />
        </DefaultInput>
        <DefaultInput label="Passoword">
            <Field type="password" name="password" className="form-control" />
            <InputFeedback error={touched.password && errors.password} />
        </DefaultInput>
        <SubmitButton disabled={!dirty || isSubmitting || errors.email} ></SubmitButton>
    </Form>
)

LoginInnerForm.propTypes = {
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    values: PropTypes.any.isRequired,
    errors: PropTypes.any.isRequired,
    touched: PropTypes.any.isRequired,
    dirty: PropTypes.bool
}

