import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
import { ApiService } from '../../../services/data.service';
import signupFormSchema from './validationSchema';
import { persistMyInfo } from '../../../services/localStorage';
import { connect } from 'react-redux';
import { compose } from 'redux';


const mapStateToProps = state => ({ ters: state.terState.ters })
const mapDispatchToProps = dispatch => ({
	loggedIn: (payload) => dispatch({ type: 'LOGGED_IN', payload })
})


export const EnhancedSignupForm = compose(
	connect(mapStateToProps, mapDispatchToProps),
	withFormik({
	validationSchema: signupFormSchema,
	handleSubmit: (values, { props, setSubmitting, setErrors }) => {
		ApiService.signup({ email: values.email, password: values.password, name: values.name }).then((payload) => {
			setSubmitting(false);
			persistMyInfo(payload.user.role, payload.user._id, payload.token)
			props.history.push('myProfile')
			props.loggedIn(payload)
		}).catch(err => {
			setSubmitting(false)
		})
	},
	displayName: 'UserForm',

}))(InnerForm);


