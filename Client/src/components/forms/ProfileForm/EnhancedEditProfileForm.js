import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
import { ApiService } from '../../../services/data.service';
import profileFormSchema from './validationSchema';
import { toast } from 'react-toastify';

export const EnhancedEditProfileForm = withFormik({
	mapPropsToValues: props => {	
		return { name: props.profile.name, email: props.profile.email }
	},
	validationSchema: profileFormSchema,
	handleSubmit: (values, { props, setSubmitting, setErrors, resetForm }) => {
		ApiService.editMyProfile(props.profile._id, values).then((payload) => {
			setSubmitting(false);
			toast.success('Updated successfully')
			resetForm({email: payload.email, name: payload.name})
		}).catch(err => {
			setSubmitting(false)
			toast.error(err.data&&err.data.msg?err.data.msg:'Error')
		})
	},
	displayName: 'ProfileForm',

})(InnerForm);

