import React from 'react'
import Navbar2 from './components/Navbar2'
import { BrowserRouter, Route } from 'react-router-dom'
import Ter from './components/Ter';
import Login from './components/routes/Login';
import { ApiService } from './services/data.service';
import { ToastContainer, toast } from 'react-toastify';
import AddBike from './components/routes/AddBike';
import { connect } from 'react-redux';
import BikeListing from './components/BikesListing';
import EditBike from './components/routes/EditBike';
import BikeForReservationListing from './components/BikesForReservationListing';


class Appa extends React.Component {

  UNSAFE_componentWillMount() {
    ApiService.init()
  }

  notify = () => toast("Wow so easy !");

  render() {
    return(
      <BrowserRouter>
      <div>
        <Navbar2 />
        <div className="container">
          <Route path="/users" component={Ter} />
          <Route path="/login" component={Login} />
          <Route path="/addBike" component={AddBike} />
          <Route path="/bikes" component={BikeListing} />
          <Route path="/bikesForReservation" component={BikeForReservationListing} />
          <Route path="/editBike/:id" component={EditBike} />
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
    isAuthenticated: state.authStoreState.isAuthenticated
  }
}
// const mapDispatchToProps = dispatch => {
//   return ({
//       loggedIn: (payload) => dispatch({ type: 'LOGGED_IN', payload })
//   })
// }

const App = connect(mapStateToProps, {})(Appa)

export default App
