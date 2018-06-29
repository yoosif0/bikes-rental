import React from 'react'
import {Navbar} from './components/layout/Navbar2'
import { BrowserRouter, Route } from 'react-router-dom'
import Users from './components/routes/Users';
import Login from './components/routes/Login';
// import { ApiService } from './services/data.service';
import { ToastContainer } from 'react-toastify';
import AddBike from './components/routes/AddBike';
import { connect } from 'react-redux';
import BikeListing from './components/routes/BikesListing';
import EditBike from './components/routes/EditBike';
import BikeForReservationListing from './components/routes/BikesForReservationListing';
import PrivateRoute from './hoc/PrivateRoute';
import PropTypes from 'prop-types';
import ManagerPrivateRoute from './hoc/ManagerPrivateRoute';
import EditUser from './components/routes/EditUser';
import Signup from './components/routes/Signup';
import {MyProfile} from './components/routes/MyProfile';
import { BikesMap } from './components/routes/BikesMap';
import ForgotPassword from './components/routes/ForgotPassword';
import PasswordRecoveredSuccessfully from './components/routes/PasswordRecoveredSuccessfully';
import RecoveryCode from './components/routes/RecoveryCode';
import ChangeMyPasswordUsingOldPassword from './components/routes/ChangeMyPasswordUsingOldPassword';

class Appa extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <div className="container">
            <ManagerPrivateRoute isManager={this.props.isManager} path="/users" component={Users} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/forgotPassword" component={ForgotPassword} />
            <Route path="/recoveryCode" component={RecoveryCode} />
            <Route path="/passwordRecoveredSuccessfully" component={PasswordRecoveredSuccessfully} />

            <ManagerPrivateRoute isManager={this.props.isManager} path="/addBike" component={AddBike} />
            <ManagerPrivateRoute isManager={this.props.isManager} path="/bikes" component={BikeListing} />
            <PrivateRoute authed={this.props.isAuthenticated} path="/bikesForReservation" component={BikeForReservationListing} />
            <PrivateRoute authed={this.props.isAuthenticated} path="/myProfile" component={MyProfile} />
            <PrivateRoute authed={this.props.isAuthenticated} path="/changeMyPasswordUsingOldPassword" component={ChangeMyPasswordUsingOldPassword} />

            <PrivateRoute authed={this.props.isAuthenticated} path="/map" component={BikesMap}/>
            <ManagerPrivateRoute isManager={this.props.isManager} path="/editBike/:id" component={EditBike} />
            <ManagerPrivateRoute isManager={this.props.isManager} path="/editUser/:id" component={EditUser} />

          </div>
          <ToastContainer />
        </div>
      </BrowserRouter>

    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authStoreState.isAuthenticated,
    isManager: state.authStoreState.isAuthenticated && state.authStoreState.role === 'manager'
  }
}

Appa.propTypes = {
  isAuthenticated: PropTypes.bool,
  isManager: PropTypes.bool
}
// const mapDispatchToProps = dispatch => {
//   return ({
//       loggedIn: (payload) => dispatch({ type: 'LOGGED_IN', payload })
//   })
// }

const App = connect(mapStateToProps, {})(Appa)

export default App
