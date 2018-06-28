import React from 'react'
import Navbar2 from './components/Navbar2'
import { BrowserRouter, Route } from 'react-router-dom'
import Ter from './components/Ter';
import Login from './components/routes/Login';
// import { ApiService } from './services/data.service';
import { ToastContainer, toast } from 'react-toastify';
import AddBike from './components/routes/AddBike';
import { connect } from 'react-redux';
import BikeListing from './components/BikesListing';
import EditBike from './components/routes/EditBike';
import BikeForReservationListing from './components/BikesForReservationListing';
import PrivateRoute from './hoc/PrivateRoute';
import PropTypes from 'prop-types';
import ManagerPrivateRoute from './hoc/ManagerPrivateRoute';
import EditUser from './components/routes/EditUser';
import Signup from './components/routes/Signup';
import MyProfile from './components/routes/MyProfile';

class Appa extends React.Component {

  // UNSAFE_componentWillMount() {
  //   ApiService.init()
  // }

  notify = () => toast("Wow so easy !");

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar2 />
          <div className="container">
            <ManagerPrivateRoute isManager={this.props.isManager} path="/users" component={Ter} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <ManagerPrivateRoute isManager={this.props.isManager} path="/addBike" component={AddBike} />
            <ManagerPrivateRoute isManager={this.props.isManager} path="/bikes" component={BikeListing} />
            <PrivateRoute authed={this.props.isAuthenticated} path="/bikesForReservation" component={BikeForReservationListing} />
            <PrivateRoute authed={this.props.isAuthenticated} path="/myProfile" component={MyProfile} />
            <ManagerPrivateRoute isManager={this.props.isManager} path="/editBike/:id" component={EditBike} />
            <ManagerPrivateRoute isManager={this.props.isManager} path="/editUser/:id" component={EditUser} />

          </div>
          <button onClick={this.notify}>Notify !</button>
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
