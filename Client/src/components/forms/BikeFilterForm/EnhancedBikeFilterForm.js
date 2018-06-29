import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
import bikeFormSchema from './validationSchema';


export const EnhancedBikeFilterForm = withFormik({
	validationSchema: bikeFormSchema,
	mapPropsToValues: props => {
		return {
			model: props.filter.model || '', color: props.filter.color || '', minWeight: props.filter.minWeight, startDate: null, endDate: null,			
			maxWeight: props.filter.maxWeight, rateAverage: props.filter.rateAverage,
		}
	},
	handleSubmit: (values, { props, setSubmitting, setErrors }) => {
		props.filterUpdated(values)
		setSubmitting(false);
	},
	displayName: 'BikeFilterForm',

})(InnerForm);
