import React from 'react'
import Title from '../text/Title';
import { Button } from 'reactstrap';
import loginFormSchema from '../forms/LoginForm/validationSchema';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { ApiService } from '../../services/data.service';
import { persistMyInfo } from '../../services/localStorage';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { InnerForm } from '../forms/LoginForm/InnerForm';
import { SubmitButton } from '../buttons/SubmitButton';

const mapDispatchToProps = dispatch => ({ loggedIn: (payload) => dispatch({ type: 'LOGGED_IN', payload }) })

class PLogin extends React.Component {

  onSubmit = (values, { setSubmitting, setErrors }) => {
    return ApiService.login({ email: values.email, password: values.password }).then((payload) => {
      setSubmitting(false);
      persistMyInfo(payload.user.role, payload.user._id, payload.token)
      this.props.loggedIn(payload)
      this.props.history.push('myProfile')
      toast.success('Logged in successfully')
    }).catch(err => {
      setSubmitting(false)
      toast.error(err.data && err.data.msg ? err.data.msg : 'Error')
    })
  }

  innerForm = props => (
    <InnerForm {...props}>
      <SubmitButton disabled={!props.dirty || props.isSubmitting || Object.keys(props.errors).length} ></SubmitButton>
    </InnerForm>
  )

  render() {
    return (
      <div>
        <Title> Login </Title>
        <Formik
          validationSchema={loginFormSchema}
          initialValues={{ email: '', password: '' }}
          onSubmit={this.onSubmit}
          render={this.innerForm}
        />
        <Button className="pull-right" color="link" onClick={() => this.props.history.push('forgotPassword')}>Forgot Password </Button>
      </div>
    );
  }
}

const Login = compose(withRouter, connect(null, mapDispatchToProps))(PLogin)

export default Login;