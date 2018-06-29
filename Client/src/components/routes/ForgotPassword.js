import React from 'react'
import Title from '../text/Title';
import { EnhancedForgotPasswordForm } from '../forms/ForgotPasswordForm/EnhancedForgotPasswordForm';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';



const ForgotPassword = ({history}) => (
  <div>
    <Title> ForgotPassword </Title>
    <EnhancedForgotPasswordForm />
    <Button className="mt-4" color="default"onClick={()=>history.push('recoveryCode')}>Go to Recovery Code </Button>
  </div>
);


ForgotPassword.propTypes = {
  history: PropTypes.any,
}




export default ForgotPassword;