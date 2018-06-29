import React from 'react'
import Title from '../text/Title';
import PropTypes from 'prop-types';
import { EnhancedRecoveryCodeForm } from '../forms/RecoveryCode/EnhancedRecoveryCodeForm';


const RecoveryCode = ({history}) => (
  <div>
    <Title> Recovery Code </Title>
    <EnhancedRecoveryCodeForm />
  </div>
);


RecoveryCode.propTypes = {
  history: PropTypes.any,
}




export default RecoveryCode;