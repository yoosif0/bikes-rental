import React from 'react'
import { Route, Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';

function ManagerPrivateRoute ({component: Component, isManager, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => isManager === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
  }

  export default ManagerPrivateRoute

  ManagerPrivateRoute.propTypes = {
    location: PropTypes.any,
    component: PropTypes.any,
    isManager: PropTypes.bool.isRequired
}

