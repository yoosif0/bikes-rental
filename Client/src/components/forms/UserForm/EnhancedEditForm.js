import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
import PropTypes from 'prop-types';
import { ApiService } from '../../../services/data.service';
import userFormSchema from './validationSchema';

// const authStore = mobx.toJS(AuthStore);
export const EnhancedUserForm = withFormik({
	// Transform outer props into form values
	mapPropsToValues: props => {	
		return { name: props.user.name, email: props.user.email, role: props.user.role }
	},
	validationSchema: userFormSchema,
	// mapValuesToPayload: x => {
	// 	return x
	// },
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

