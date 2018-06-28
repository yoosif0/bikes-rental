import * as Yup from 'yup';
const userFormSchema = Yup.object().shape({
    name: Yup.string().max(20, 'Do not enter a huge name').min(3, 'Do not enter a tiny name').required('Name is required!'),
    email: Yup.string().email('Invalid email address').required('Email is required!'),
})

export default userFormSchema