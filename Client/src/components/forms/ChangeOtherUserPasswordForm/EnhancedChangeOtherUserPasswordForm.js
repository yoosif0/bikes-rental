import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
import { ApiService } from '../../../services/data.service';
import { toast } from 'react-toastify';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import changeOtherUserSchema from './validationSchema';


export const EnhancedChangeOtherUserPasswordForm = compose(
	withRouter,
	withFormik({
		validationSchema: changeOtherUserSchema,
		handleSubmit: (values, { props, setSubmitting, setErrors }) => {
			ApiService.changeOtherUserPassword(props.userId, values.newPassword)
				.then((payload) => {
					setSubmitting(false);
					toast.success('Password updated successfully')
				}).catch(err => {
					setSubmitting(false)
					toast.error(err.data&&err.data.msg?err.data.msg:'Error')
				})
		},
		displayName: 'ChangeOtherUserPasswordForm',

	}))(InnerForm)

