import React from 'react'
import DefaultInput from '../../ui-inputs/DefaultInputLayout';
import SubmitButton from '../../buttons/SubmitButton';
import { Form, Field } from 'formik';
import { InputFeedback } from '../../text/InputFeedback';
import { captchaSiteKey } from '../../../config/constants';
import ReCAPTCHA  from "react-google-recaptcha";

export const InnerForm = ({ values, errors, touched, isSubmitting, dirty, setFieldValue }) => (
    <Form>
        <DefaultInput label="Name">
            <Field type="text" name="name" className="form-control" />
            <InputFeedback error={touched.name && errors.name} />
        </DefaultInput>
        <DefaultInput label="Email">
            <Field type="text" name="email" className="form-control" />
            <InputFeedback error={touched.email && errors.email} />
        </DefaultInput>
        <DefaultInput label="Password">
            <Field type="password" name="password" className="form-control" />
            <InputFeedback error={touched.password && errors.password} />
        </DefaultInput>
        <DefaultInput label="Confirm Password">
            <Field type="password" name="passwordConfirm" className="form-control" />
            <InputFeedback error={touched.passwordConfirm && errors.passwordConfirm} />
        </DefaultInput>
        <ReCAPTCHA name="recaptcha" sitekey={captchaSiteKey} onChange={(response) => { setFieldValue("recaptcha", response); }}/>,
      
        <SubmitButton disabled={!dirty || isSubmitting || Object.keys(errors).length} ></SubmitButton>
    </Form>
)
