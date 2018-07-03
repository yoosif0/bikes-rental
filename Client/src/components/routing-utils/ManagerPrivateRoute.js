import React from 'react'
import { Route, Redirect } from 'react-router-dom';


export function ManagerPrivateRoute ({component: Component, isManager, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => isManager === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
  }

