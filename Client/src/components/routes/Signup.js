import React from 'react'
import Title from '../text/Title';
import SignupEnhancedFormConnectedToRedux from '../forms/SignupForm/EnhancedSignupForm';

const Signup = () => (
  <div>
    <Title> Signup </Title>
    <SignupEnhancedFormConnectedToRedux />
  </div>
);

export default Signup;