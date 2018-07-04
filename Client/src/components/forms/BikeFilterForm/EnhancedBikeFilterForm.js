import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
import bikeFilterFormSchema from './validationSchema';


export const EnhancedBikeFilterForm = withFormik({
	validationSchema: bikeFilterFormSchema,
	mapPropsToValues: props => {
		return {
			model: props.filter.model || '', color: props.filter.color || '', minWeight: props.filter.minWeight|| '', startDate: null, endDate: null,			
			maxWeight: props.filter.maxWeight|| '', avgRate: props.filter.avgRate || ''
		}
	},
	handleSubmit: (values, { props, setSubmitting, setErrors }) => {
		props.filterUpdated(values)
		setSubmitting(false);
	},
	displayName: 'BikeFilterForm',

})(InnerForm);
