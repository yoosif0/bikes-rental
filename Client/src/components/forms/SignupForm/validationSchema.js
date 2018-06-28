import * as Yup from 'yup';
const signupFormSchema = Yup.object().shape({
    name: Yup.string().max(20, 'Do not enter a huge name').min(3, 'Do not enter a tiny name').required('Name is required!'),
    email: Yup.string().email('Invalid email address').required('Email is required!'),
    password: Yup.string().required('Password is required'),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password') ], 'Please enter a similar password').required('Please confirm your password')
})

export default signupFormSchema