import React from 'react'
import { Button } from 'reactstrap';


const PasswordRecoveredSuccessfully = ({ history }) => (
    <div className="jumbotron">
        <h1>Congratz</h1>
        <p>Your password has been recovered successfully. </p>
        <Button className="mt-4" color="default" onClick={() => history.push('login')}>Go to Login </Button>
    </div>
);




export default PasswordRecoveredSuccessfully;