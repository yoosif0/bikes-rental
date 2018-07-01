import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
import { ApiService } from '../../../services/data.service';
import signupFormSchema from './validationSchema';
import { persistMyInfo } from '../../../services/localStorage';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { toast } from 'react-toastify';


const mapDispatchToProps = dispatch => ({
	loggedIn: (payload) => dispatch({ type: 'LOGGED_IN', payload })
})

export const EnhancedSignupForm = compose(
	connect(null, mapDispatchToProps),
	withFormik({
		mapPropsToValues: props => ({ email: '', name: '', password: '', passwordConfirm: '', recaptch: null }),
		validationSchema: signupFormSchema,
		handleSubmit: (values, { props, setSubmitting, setErrors, setFieldValue }) => {
			ApiService.signup({ email: values.email, password: values.password, name: values.name }).then((payload) => {
				setSubmitting(false);
				persistMyInfo(payload.user.role, payload.user._id, payload.token)
				props.history.push('myProfile')
				props.loggedIn(payload)
			}).catch(err => {
				setSubmitting(false)
				// setFieldValue('recaptcha', null)
				toast.error(err.data.msg)
			})
		},
		displayName: 'UserForm',

	}))(InnerForm);


