import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
import PropTypes from 'prop-types';
import { ApiService } from '../../../services/data.service';
import userFormSchema from './validationSchema';

export const EnhancedUserForm = withFormik({
	mapPropsToValues: props => {	
		return { name: props.user.name, email: props.user.email, role: props.user.role }
	},
	validationSchema: userFormSchema,
	handleSubmit: (values, { props, setSubmitting, setErrors }) => {
		ApiService.editUser(props.user._id, values).then((payload) => {
			setSubmitting(false);
		}).catch(err => {
			setSubmitting(false)
		})
	},
	displayName: 'UserForm',

})(InnerForm);

EnhancedUserForm.propTypes = {
	todoStore: PropTypes.object
};

