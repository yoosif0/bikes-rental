import * as Yup from 'yup';

const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required!'),
})

export default forgotPasswordSchema