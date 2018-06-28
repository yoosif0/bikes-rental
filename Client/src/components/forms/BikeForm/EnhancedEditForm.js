import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
import PropTypes from 'prop-types';
import { ApiService } from '../../../services/data.service';
import bikeFormSchema from './validationSchema';

export const EnhancedBikeForm = withFormik({
	mapPropsToValues: props => {
		return { model: props.bike.model, color: props.bike.color, weight: props.bike.weight, latitude: props.bike.location.coordinates[0], 
			longitude: props.bike.location.coordinates[1],  }
	},
	validationSchema: bikeFormSchema,
	mapValuesToPayload: x => {
		return x
	},
	handleSubmit: (values, { props, setSubmitting, setErrors }) => {
		ApiService.editBike(props.bike._id, values).then((payload) => {
			setSubmitting(false);
		}).catch(err => {
			setSubmitting(false)
		})
	},
	displayName: 'BikeForm',

})(InnerForm);

EnhancedBikeForm.propTypes = {
	todoStore: PropTypes.object
};
