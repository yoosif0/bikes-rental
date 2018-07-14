import React from 'react'
import { Navbar } from './components/layout/Navbar'
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/routes/Login';
import { ToastContainer } from 'react-toastify';
import AddBike from './components/routes/AddBike';
import { connect } from 'react-redux';
import { BikesListing } from './components/routes/BikesListing';
import EditBike from './components/routes/EditBike';
import EditUser from './components/routes/EditUser';
import Signup from './components/routes/Signup';
import { MyProfile } from './components/routes/MyProfile';
import { BikesMap } from './components/routes/BikesMap';
import ForgotPassword from './components/routes/ForgotPassword';
import PasswordRecoveredSuccessfully from './components/routes/PasswordRecoveredSuccessfully';
import RecoveryCode from './components/routes/RecoveryCode';
import ChangeMyPasswordUsingOldPassword from './components/routes/ChangeMyPasswordUsingOldPassword';
import ChangeOtherUserPassword from './components/routes/ChangeOtherUserPassword';
import { PastReservations } from './components/routes/PastReservations';
import { UpcomingReservations } from './components/routes/UpcomingReservations';
import { MyPreviouslyUsedBikes } from './components/routes/MyPreviouslyUsedBikes';
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';
import { BikeReservations } from './components/routes/BikeReservations';
import { ManagerPrivateRoute } from './components/routing-utils/ManagerPrivateRoute';
import { PrivateRoute } from './components/routing-utils/PrivateRoute';
import { UsersListing } from './components/routes/UsersListing';


class Appa extends React.Component {
  render() {
    loadProgressBar();

    return (

      <BrowserRouter>
        <div>
          <Navbar />
          <div className="container">
            {/* {
            this.props.isAuthenticated ? <Redirect from="/" to="myProfile" /> : <Redirect from="/" to="login" />
          } */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/forgotPassword" component={ForgotPassword} />
            <Route path="/recoveryCode" component={RecoveryCode} />
            <Route path="/passwordRecoveredSuccessfully" component={PasswordRecoveredSuccessfully} />
            <PrivateRoute authed={this.props.isAuthenticated} path="/bikes" component={BikesListing} />
            <PrivateRoute authed={this.props.isAuthenticated} path="/myProfile" component={MyProfile} />
            <PrivateRoute authed={this.props.isAuthenticated} path="/changeMyPasswordUsingOldPassword" component={ChangeMyPasswordUsingOldPassword} />
            <PrivateRoute authed={this.props.isAuthenticated} path="/map" component={BikesMap} />
            <PrivateRoute authed={this.props.isAuthenticated} path="/pastReservations" component={PastReservations} />
            <PrivateRoute authed={this.props.isAuthenticated} path="/upcomingReservations" component={UpcomingReservations} />
            <PrivateRoute authed={this.props.isAuthenticated} path="/MyPreviouslyUsedBikes" component={MyPreviouslyUsedBikes} />
            <ManagerPrivateRoute isManager={this.props.isManager} path="/users" component={UsersListing} />
            <ManagerPrivateRoute isManager={this.props.isManager} path="/addBike" component={AddBike} />
            <ManagerPrivateRoute isManager={this.props.isManager} path="/editBike/:id" component={EditBike} />
            <ManagerPrivateRoute isManager={this.props.isManager} path="/bikeReservations" component={BikeReservations} />
            <ManagerPrivateRoute isManager={this.props.isManager} path="/editUser/:id" component={EditUser} />
            <ManagerPrivateRoute isManager={this.props.isManager} path="/changeOtherUserPassword/:id" component={ChangeOtherUserPassword} />
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
const App = connect(mapStateToProps, {})(Appa)

export default App
