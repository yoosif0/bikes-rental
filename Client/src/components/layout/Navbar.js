import React from 'react'
import { NavLink, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { unPersistMyInfo } from '../../services/localStorage';
import { compose } from 'redux';

const NavBarLink = ({ to, label }) => (
    <li className="nav-item" style={{marginRight:'20px'}}>
        <NavLink activeClassName="active" to={to} className="nav-link">{label}</NavLink>
    </li>
)


export const PNavbar = ({ isManager, isAuthenticated, logout }) => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <NavLink className="navbar-brand" to="/"> Bikes Rental © </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto" >
                {
                    isAuthenticated ?
                        <React.Fragment>
                            <NavBarLink to='/myProfile' label="My profile" />
                            <NavBarLink to='/bikes/listing' label="Bikes" />
                            <NavBarLink to='/map' label="Map" />
                            <NavBarLink to='/myUpcomingReservations' label="My Upcoming Reservations" />
                            <NavBarLink to='/myPastReservations' label="My Past Reservations" />
                            <NavBarLink to='/myPreviouslyUsedBikes' label="My Previously Used Bikes" />
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <NavBarLink to='/map' label="Login" />
                            <NavBarLink to='/signup' label="Signup" />
                        </React.Fragment>
                }
                {isManager &&
                    <React.Fragment>
                        <NavBarLink to='/addBike' label="Add new Bike" />
                        <NavBarLink to='/users' label="Users" />
                    </React.Fragment>
                }
            </ul>
            {
                isAuthenticated &&
                <ul className="navbar-nav ml-auto mr-5" >
                    <li className="nav-item" onClick={() => logout()} id="logout">
                        <Link to="login" className="nav-link">Logout</Link>
                    </li>
                </ul>
            }
        </div>

    </nav>
)

const mapStateToProps = state => ({
    isAuthenticated: state.authStoreState.isAuthenticated,
    isManager: state.authStoreState.role === 'manager'
})

const mapDispatchToProps = dispatch => ({
    logout: () => {
        unPersistMyInfo()
        dispatch({ type: 'LOGGED_OUT' })
    }
})

export const Navbar = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(PNavbar)



