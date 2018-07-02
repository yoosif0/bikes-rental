import React from 'react'
import Title from '../text/Title';
import { EnhancedForgotPasswordForm } from '../forms/ForgotPasswordForm/EnhancedForgotPasswordForm';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';



const ForgotPassword = ({history}) => (
  <div>
    <Title> ForgotPassword </Title>
    <EnhancedForgotPasswordForm />
    <Button className="pull-right" color="link" onClick={()=>history.push('recoveryCode')}>Received Recovery Code Already? </Button>
  </div>
);


ForgotPassword.propTypes = {
  history: PropTypes.any,
}




export default ForgotPassword;