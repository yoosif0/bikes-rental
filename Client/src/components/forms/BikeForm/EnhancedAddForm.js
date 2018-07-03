import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
import { ApiService } from '../../../services/data.service';
import bikeFormSchema from './validationSchema';
import { toast } from 'react-toastify';

// const authStore = mobx.toJS(AuthStore);
export const EnhancedBikeForm = withFormik({
	mapPropsToValues: props => {
		return { model: '', color: '', weight: '', longitude: '',latitude: '', isAvailable: true  }
	},
	validationSchema: bikeFormSchema,
	handleSubmit: (values, { props, setSubmitting, setErrors }) => {
		ApiService.addBike(values).then((payload) => {
			setSubmitting(false);
			toast.success('Added successfully')
		}).catch(err => {
			toast.error(err.data?err.data.msg:'Error')
			setSubmitting(false)
		})
	},
	displayName: 'BikeForm',

})(InnerForm);
