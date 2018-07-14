import * as Yup from 'yup';
import { passwordPattern, passwordErrorMessage } from '../../../config/constants';

const recoveryCodeSchema = Yup.object().shape({
    email: Yup.string().email().required('Required!'),
    recoveryCode: Yup.string().min(20, 'should be 20 characters').max(20, 'should be 20 characters').required('Recovery Code is required'),
    newPassword: Yup.string().matches(passwordPattern, passwordErrorMessage).required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword') ], 'Please enter a similar password').required('Please confirm your password')
})

export default recoveryCodeSchema