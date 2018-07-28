import * as Yup from 'yup';
const loginFormSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required!'),
})

export default loginFormSchema