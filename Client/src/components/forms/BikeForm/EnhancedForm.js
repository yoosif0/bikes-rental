import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
// import { ApiService } from '../../services/data.service';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

// const authStore = mobx.toJS(AuthStore);
export const EnhancedBikeForm = withFormik({
	// Transform outer props into form values
    mapPropsToValues: props => ({ name: 'eeeeee', numOfCalories: '' }),

	validationSchema: Yup.object().shape({
		weight: Yup.number().min(5, "Weight should be atleast 5 kg").max(300, "Weight should not exceed 300 kg").required('Weight is required!'),
	}),
	mapValuesToPayload: x => x,
	handleSubmit: (values, { props, setSubmitting, setErrors }) => {
		console.log(values)
		// ApiService.login(values).then(
		// 	user => {
		// 		setSubmitting(false);
		// 		// do whatevs...
		// 		// props.updateUser(user)
		// 	},
		// 	errors => {
		// 		setSubmitting(false);
		// 		setErrors([]);
		// 	}
		// );
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