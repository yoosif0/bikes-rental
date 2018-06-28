import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
import { ApiService } from '../../../services/data.service';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { persistMyInfo } from '../../../services/localStorage';
import { toast } from 'react-toastify';

// const authStore = mobx.toJS(AuthStore);
const EnhancedLoginForm = withFormik({
	// Transform outer props into form values
	mapPropsToValues: props => ({ email: 'ddd@test.com', password: '1234567' }),
	validationSchema: Yup.object().shape({
		email: Yup.string().email('Invalid email address').required('Email is required!'),
	}),
	mapValuesToPayload: x => x,
	handleSubmit: (values, { props, setSubmitting, setErrors }) => {
		ApiService.login({ email: values.email, password: values.password }).then((payload) => {
			setSubmitting(false);
			persistMyInfo(payload)
			props.loggedIn(payload)
			console.log(props.history)
			// props.history.push('/bikes');

		}).catch(err=>{
			setSubmitting(false)
			toast.error(err.data.msg)
		})
	},
	displayName: 'LoginForm',

})(InnerForm);


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

const ConnectedEnhancedLoginForm = connect(mapStateToProps, mapDispatchToProps)(EnhancedLoginForm)

export default ConnectedEnhancedLoginForm

EnhancedLoginForm.propTypes = {
    getData: PropTypes.func,
    ters: PropTypes.array
}
