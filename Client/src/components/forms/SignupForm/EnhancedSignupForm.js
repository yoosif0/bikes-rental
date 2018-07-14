import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
import { ApiService } from '../../../services/data.service';
import signupFormSchema from './validationSchema';
import { persistMyInfo } from '../../../services/localStorage';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';


const mapDispatchToProps = dispatch => ({
	loggedIn: (payload) => dispatch({ type: 'LOGGED_IN', payload })
})

export const EnhancedSignupForm = compose(
	connect(null, mapDispatchToProps),
	withRouter,
	withFormik({
		mapPropsToValues: props => ({ email: '', name: '', password: '', passwordConfirm: '', recaptcha: null }),
		validationSchema: signupFormSchema,
		handleSubmit: (values, { props, setSubmitting, setErrors, setFieldValue }) => {
			ApiService.signup({ email: values.email, password: values.password, name: values.name, "g-recaptcha-response":values.recaptcha }).then((payload) => {
				setSubmitting(false);
				persistMyInfo(payload.user.role, payload.user._id, payload.token)
				toast.success("Signed up successfully")
				props.loggedIn(payload)
				props.history.push('bikes/listing')
			}).catch(err => {
				setErrors({recaptchaExpired:true})
				setSubmitting(false)
				toast.error(err.data&&err.data.msg?err.data.msg:'Error')
			})
		},
		displayName: 'UserForm',

	}))(InnerForm);


