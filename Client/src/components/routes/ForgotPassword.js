import React from 'react'
import Title from '../text/Title';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import forgotPasswordSchema from '../forms/ForgotPasswordForm/validationSchema';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { toast } from 'react-toastify';
import { ApiService } from '../../services/data.service';
import { InnerForm } from '../forms/ForgotPasswordForm/InnerForm';

const mapDispatchToProps = dispatch => ({ saveEmailGlobally: (payload) => dispatch({ type: 'SAVE_PUBLIC_EMAIL', payload }) })

class PForgotPassword extends React.Component {
  onSubmit = (values, { setSubmitting, setErrors }) => {
    ApiService.forgottenPassword(values.email).then((payload) => {
      this.props.saveEmailGlobally(values.email)
      setSubmitting(false);
      toast.success('Recovery Code has been sent to your email')
      this.props.history.push('recoveryCode')
    }).catch(err => {
      setSubmitting(false)
      toast.error(err.data && err.data.msg ? err.data.msg : 'Error')
    })
  }


  innerForm = props => (
    <InnerForm {...props}>  </InnerForm>
  )

  render() {
    return (
      <div>
        <Title> ForgotPassword </Title>
        <Formik
          validationSchema={forgotPasswordSchema}
          initialValues={{ email: '' }}
          onSubmit={this.onSubmit}
          render={this.innerForm}
        />
        <Button className="pull-right" color="link" onClick={() => this.props.history.push('recoveryCode')}>Received Recovery Code Already? </Button>
      </div>

    )
  }
}


const ForgotPassword = compose(withRouter, connect(null, mapDispatchToProps))(PForgotPassword)
export default ForgotPassword;