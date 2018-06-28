import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
import PropTypes from 'prop-types';
import { ApiService } from '../../../services/data.service';
import bikeFormSchema from './validationSchema';
import { toast } from 'react-toastify';

// const authStore = mobx.toJS(AuthStore);
export const EnhancedBikeForm = withFormik({
	validationSchema: bikeFormSchema,
	mapValuesToPayload: x => x,
	handleSubmit: (values, { props, setSubmitting, setErrors }) => {
		ApiService.addBike(values).then((payload) => {
			setSubmitting(false);
			toast.success('Added successfully')
		}).catch(err => {
			toast.error(err)
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