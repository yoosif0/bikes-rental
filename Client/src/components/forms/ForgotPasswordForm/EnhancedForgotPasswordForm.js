import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
import { ApiService } from '../../../services/data.service';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import forgotPasswordSchema from './validationSchema';

const mapDispatchToProps = dispatch => ({ saveEmailGlobally: (payload) => dispatch({ type: 'SAVE_PUBLIC_EMAIL', payload }) })

export const EnhancedForgotPasswordForm = compose(
	withRouter,
	connect(null, mapDispatchToProps),
	withFormik({
		validationSchema: forgotPasswordSchema,
		handleSubmit: (values, { props, setSubmitting, setErrors }) => {
			ApiService.forgottenPassword(values.email).then((payload) => {
				props.saveEmailGlobally(values.email)
				setSubmitting(false);
				toast.success('Recovery Code has been sent to your email')
				props.history.push('recoveryCode')
			}).catch(err => {
				setSubmitting(false)
				toast.error(err.data.msg)
			})
		},
		displayName: 'ForgotPasswordForm',

	}))(InnerForm)


EnhancedForgotPasswordForm.propTypes = {
	getData: PropTypes.func,
	ters: PropTypes.array
}
