import * as Yup from 'yup';
import { passwordPattern, passwordErrorMessage } from '../../../config/constants';

const recoveryCodeSchema = Yup.object().shape({
    oldPassword: Yup.string().matches(passwordPattern, passwordErrorMessage).required('Required!'),
    newPassword: Yup.string().matches(passwordPattern, passwordErrorMessage).required('Required!'),
    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword') ], 'Please enter a similar password').required('Please confirm your password')
})

export default recoveryCodeSchema