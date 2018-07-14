import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
import { ApiService } from '../../../services/data.service';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { persistMyInfo } from '../../../services/localStorage';
import { toast } from 'react-toastify';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = dispatch =>  ({  loggedIn: (payload) => dispatch({ type: 'LOGGED_IN', payload })  })

export const EnhancedLoginForm = compose(
	withRouter,
	connect(null, mapDispatchToProps),
	withFormik({
	mapPropsToValues: props => ({ email: '', password: '' }),
	validationSchema: Yup.object().shape({
		email: Yup.string().email('Invalid email address').required('Email is required!'),
	}),
	mapValuesToPayload: x => x,
	handleSubmit: (values, { props, setSubmitting, setErrors }) => {
		ApiService.login({ email: values.email, password: values.password }).then((payload) => {
			setSubmitting(false);
			persistMyInfo(payload.user.role, payload.user._id, payload.token)
			props.loggedIn(payload)
			props.history.push('myProfile')
			toast.success('Logged in successfully')
		}).catch(err=>{
			setSubmitting(false)
			toast.error(err.data&&err.data.msg?err.data.msg:'Error')
		})
	},
	displayName: 'LoginForm',

}))(InnerForm)
