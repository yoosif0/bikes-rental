import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
import PropTypes from 'prop-types';
import { ApiService } from '../../../services/data.service';
import userFormSchema from './validationSchema';
import { toast } from 'react-toastify';

export const EnhancedUserForm = withFormik({
	mapPropsToValues: props => {	
		return { name: props.user.name, email: props.user.email, role: props.user.role }
	},
	validationSchema: userFormSchema,
	handleSubmit: (values, { props, setSubmitting, setErrors }) => {
		ApiService.editUser(props.user._id, values).then((payload) => {
			toast.success('Updated successfully')
			setSubmitting(false);
		}).catch(err => {
			setSubmitting(false)
			toast.error(err.data.msg)
		})
	},
	displayName: 'UserForm',

})(InnerForm);

EnhancedUserForm.propTypes = {
	todoStore: PropTypes.object
};

