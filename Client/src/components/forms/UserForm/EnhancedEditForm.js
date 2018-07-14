import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
import { ApiService } from '../../../services/data.service';
import userFormSchema from './validationSchema';
import { toast } from 'react-toastify';

export const EnhancedUserForm = withFormik({
	mapPropsToValues: props => {	
		return { name: props.user.name, email: props.user.email, role: props.user.role }
	},
	validationSchema: userFormSchema,
	handleSubmit: (values, { props, setSubmitting, setErrors, resetForm }) => {
		ApiService.editUser(props.user._id, values).then((payload) => {
			toast.success('Updated successfully')
			setSubmitting(false);
			resetForm({email: payload.email, name: payload.name, role: payload.role})
		}).catch(err => {
			setSubmitting(false)
			toast.error(err.data&&err.data.msg?err.data.msg:'Error')
		})
	},
	displayName: 'UserForm',

})(InnerForm);
