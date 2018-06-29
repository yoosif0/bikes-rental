

import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
import { ApiService } from '../../services/data.service';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

// const authStore = mobx.toJS(AuthStore);
export const EnhancedForm = withFormik({
	// Transform outer props into form values
    mapPropsToValues: props => ({ name: 'eeeeee', numOfCalories: '' }),

	validationSchema: Yup.object().shape({
		email: Yup.string().email('Invalid email address').required('Email is required!'),
	}),
	mapValuesToPayload: x => x,
	handleSubmit: (values, { props, setSubmitting, setErrors }) => {
		// console.log(values)
		ApiService.login(values).then(
			user => {
				setSubmitting(false);
				// do whatevs...
				// props.updateUser(user)
			},
			err => {
				setSubmitting(false);
				setErrors([]);
				toast.error(err.data.msg)
			}
		);
	},
	displayName: 'LoginForm',

})(InnerForm);

EnhancedForm.propTypes = {
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

// this.dataService.updateMeal(this.authService.getId(), this.meal._id, x).subscribe(
//     data => {
//         this.sb.emitSuccessSnackBar()
//         this.navigateBack()
//         this.caloriesTrackingSubjectService.updated$.next()
//     },
//     error => this.sb.emitErrorSnackBar(error.msg)
// )