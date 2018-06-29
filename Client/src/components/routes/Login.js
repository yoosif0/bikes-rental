import React from 'react'
import Title from '../text/Title';
import { EnhancedLoginForm } from '../forms/LoginForm/EnhancedLoginForm';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';


const Login = ({history}) => (
  <div>
    <Title> Login </Title>
    <EnhancedLoginForm />
    <Button className="mt-4" color="default"onClick={()=>history.push('forgotPassword')}>Forgot Password </Button>
  </div>
);


Login.propTypes = {
  history: PropTypes.any,
}




export default Login;