import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
import { ApiService } from '../../../services/data.service';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import recoveryCodeSchema from './validationSchema';


export const EnhancedChangeMyPasswordUsingOldPasswordForm = compose(
	withRouter,
	withFormik({
		validationSchema: recoveryCodeSchema,
		handleSubmit: (values, { props, setSubmitting, setErrors }) => {
			ApiService.changePasswordUsingOldPassword({oldPassword: values.oldPassword, newPassword: values.newPassword})
				.then((payload) => {
					setSubmitting(false);
					toast.success('Password updated successfully')
				}).catch(err => {
					setSubmitting(false)
					toast.error(err.data.msg)
				})
		},
		displayName: 'ChangeMyPasswordUsingOldPasswordForm',

	}))(InnerForm)


EnhancedChangeMyPasswordUsingOldPasswordForm.propTypes = {
	getData: PropTypes.func,
	ters: PropTypes.array
}

