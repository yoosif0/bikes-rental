import React from 'react'
import  LoginEnhancedFormConnectedToRedux from '../login/LoginEnhancedForm';
import Title from '../text/Title';


// Use <MyForm /> anywhere
const Login = () => (
  <div>
    <Title> Login </Title>
    <LoginEnhancedFormConnectedToRedux />
  </div>
);

export default Login;