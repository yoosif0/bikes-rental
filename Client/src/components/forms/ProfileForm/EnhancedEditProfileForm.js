import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
import { ApiService } from '../../../services/data.service';
import userFormSchema from './validationSchema';
import { connect } from 'react-redux';
import { saveProfile } from '../../../services/localStorage';

export const EnhancedEditProfileForm = withFormik({
	mapPropsToValues: props => {	
		return { name: props.profile.name, email: props.profile.email }
	},
	validationSchema: userFormSchema,
	handleSubmit: (values, { props, setSubmitting, setErrors }) => {
		ApiService.editMyProfile(props.user._id, values).then((payload) => {
			setSubmitting(false);
			saveProfile(payload)
			props.updated(payload)
		}).catch(err => {
			setSubmitting(false)
		})
	},
	displayName: 'ProfileForm',

})(InnerForm);


const mapStateToProps = state => {
    return {
        profile: state.authStoreState.profile,
    }
}
const mapDispatchToProps = dispatch => {
    return ({
        updated: (payload) => dispatch({ type: 'PROFILE_UPDATED', payload })
    })
}

const ConnectedEnhancedEditProfileForm = connect(mapStateToProps, mapDispatchToProps)(EnhancedEditProfileForm)

export default ConnectedEnhancedEditProfileForm