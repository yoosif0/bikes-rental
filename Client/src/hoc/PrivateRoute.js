import React from 'react'
import { Route, Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';

function PrivateRoute ({component: Component, authed, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => authed === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
  }

  export default PrivateRoute

  PrivateRoute.propTypes = {
    location: PropTypes.any,
    component: PropTypes.any,
    authed: PropTypes.bool.isRequired
}

