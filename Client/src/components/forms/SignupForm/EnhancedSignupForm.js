import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
import { ApiService } from '../../../services/data.service';
import signupFormSchema from './validationSchema';
import { persistMyInfo } from '../../../services/localStorage';
import { connect } from 'react-redux';

export const EnhancedSignupForm = withFormik({
	validationSchema: signupFormSchema,
	handleSubmit: (values, { props, setSubmitting, setErrors }) => {
		ApiService.signup({email: values.email, password: values.password, name: values.name}).then((payload) => {
            setSubmitting(false);
            persistMyInfo(payload)
			props.loggedIn(payload)
		}).catch(err => {
			setSubmitting(false)
		})
	},
	displayName: 'UserForm',

})(InnerForm);


const mapStateToProps = state => {
    return {
        ters: state.terState.ters
    }
}
const mapDispatchToProps = dispatch => {
    return ({
        loggedIn: (payload) => dispatch({ type: 'LOGGED_IN', payload })
    })
}

const SignupEnhancedFormConnectedToRedux = connect(mapStateToProps, mapDispatchToProps)(EnhancedSignupForm)

export default SignupEnhancedFormConnectedToRedux

