import { LoginInnerForm } from './LoginInnerForm';
import { withFormik, } from 'formik';
import { ApiService } from '../../services/data.service';
// import AuthStore from '../../stores/authStore';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
// import { $mobx } from 'mobx';
// import { Provider } from 'mobx-react';
// import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { saveState } from '../../services/localStorage';

// const authStore = mobx.toJS(AuthStore);
const LoginEnhancedForm = withFormik({
	// Transform outer props into form values
	mapPropsToValues: props => ({ email: 'ddd@test.com', password: '1234567' }),
	validationSchema: Yup.object().shape({
		email: Yup.string().email('Invalid email address').required('Email is required!'),
	}),
	mapValuesToPayload: x => x,
	handleSubmit: (values, { props, setSubmitting, setErrors }) => {
		ApiService.login({ email: values.email, password: values.password }).then((payload) => {
			setSubmitting(false);
			saveState(payload)
			props.loggedIn(payload)
		}).catch(err=>{
			setSubmitting(false)
		})

		// console.log(values)
		// ApiService.login(values).then(
		// 	user => {
		// 		setSubmitting(false);
		// 		// do whatevs...
		// 		// props.updateUser(user)
		// 	},
		// 	error => {
		// 		toast(error.msg);
		// 		setSubmitting(false);
		// 		setErrors([]);
		// 	}
		// );
	},
	displayName: 'LoginForm',

})(LoginInnerForm);


const mapStateToProps = state => {
    // console.log(state)
    return {
        ters: state.terState.ters
    }
}
const mapDispatchToProps = dispatch => {
    return ({
        loggedIn: (payload) => dispatch({ type: 'LOGGED_IN', payload })
    })
}

const LoginEnhancedFormConnectedToRedux = connect(mapStateToProps, mapDispatchToProps)(LoginEnhancedForm)

export default LoginEnhancedFormConnectedToRedux

LoginEnhancedForm.propTypes = {
    getData: PropTypes.func,
    ters: PropTypes.array
}
