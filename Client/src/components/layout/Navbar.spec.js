import { shallow } from 'enzyme';
import React from 'react'
import { PNavbar } from './Navbar';
import { Link } from 'react-router-dom';

describe('<PNavbar />', () => {
    it('should render Logout button if authenticated ', () => {
        const wrapper = shallow(<PNavbar isAuthenticated={true} />);
        // Not best way to test that
        expect(wrapper.contains(<Link to="login" className="nav-link">Logout</Link>)).toBeTruthy()
    });

    it('logging out', () => {
        const spy = jest.fn();
        const wrapper = shallow(<PNavbar isAuthenticated={true} logout={spy} />);
        wrapper.find('#logout').simulate('click');
        expect(spy).toHaveBeenCalledTimes(1)
      });


});