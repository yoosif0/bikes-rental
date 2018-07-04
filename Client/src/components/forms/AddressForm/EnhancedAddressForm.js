import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
import addressFormSchema from './validationSchema';


export const EnhancedAddressForm = withFormik({
	validationSchema: addressFormSchema,
	mapPropsToValues: props => {
		return {
			address: ''
		}
	},
	handleSubmit: (values, { props, setSubmitting, setErrors }) => {
		props.addressUpdated(values)
		setSubmitting(false);
	},
	displayName: 'AddressForm',

})(InnerForm);
