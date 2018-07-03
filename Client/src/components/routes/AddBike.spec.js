import { shallow } from 'enzyme';
import AddBike from './AddBike';
import React from 'react'
import { EnhancedBikeForm } from '../forms/BikeForm/EnhancedAddForm';



describe('<AddBike />', () => {
  it('should render 1 <EnhancedBikeForm /> components', () => {
    const wrapper = shallow(<AddBike />);
    expect(wrapper.find(EnhancedBikeForm).length).toBe(1);
  });
});