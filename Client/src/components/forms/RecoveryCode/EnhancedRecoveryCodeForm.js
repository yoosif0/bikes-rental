import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
import { ApiService } from '../../../services/data.service';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import recoveryCodeSchema from './validationSchema';

const mapStateToProps = state => ({ email: state.publicInfoStore.email })

export const EnhancedRecoveryCodeForm = compose(
	withRouter,
	connect(mapStateToProps, {}),
	withFormik({
		mapPropsToValues: props => {
			return { email: props.email || '', newPassword: '', recoveryCode: '', confirmPassword: '' }
		},
		validationSchema: recoveryCodeSchema,
		handleSubmit: (values, { props, setSubmitting, setErrors }) => {
			ApiService.changeMyPasswordUsingRecoveryCode({ recoveryCode: values.recoveryCode, newPassword: values.newPassword, email: values.email })
				.then((payload) => {
					setSubmitting(false);
					props.history.push('passwordRecoveredSuccessfully')
				}).catch(err => {
					setSubmitting(false)
					toast.error(err.data&&err.data.msg?err.data.msg:'Error')
				})
		},
		displayName: 'RecoveryCodeForm',

	}))(InnerForm)
