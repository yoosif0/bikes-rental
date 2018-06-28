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
	handleSubmit: (values, { props, setSubmitting, setErrors }) => {
		ApiService.editMyProfile(props.profile._id, values).then((payload) => {
			setSubmitting(false);
			toast.success('Updayed successfully')
		}).catch(err => {
			setSubmitting(false)
			console.log(err)
			toast.error(err)
		})
	},
	displayName: 'ProfileForm',

})(InnerForm);

