import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
import PropTypes from 'prop-types';
import { ApiService } from '../../../services/data.service';
import bikeFormSchema from './validationSchema';

// const authStore = mobx.toJS(AuthStore);
export const EnhancedBikeForm = withFormik({
	// Transform outer props into form values
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


//   onSubmit(loginForm) {
//     this.dataService.login(loginForm).subscribe(
//         data => {
//             this.authService.saveToken(data.token)
//             this.authService.saveProfile(data.user)
//             this.router.navigate(['my-profile'])
//         },
//         error => {
//             this.sb.emitErrorSnackBar(error.msg)
//             if (error.code === 1) {
//                 this.router.navigate(['signup/activate'])
//             }
//         }
//     )
// }