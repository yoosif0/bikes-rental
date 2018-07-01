import { shallow } from 'enzyme';
import React from 'react'
import { EnhancedChangeMyPasswordUsingOldPasswordForm } from './EnhancedChangeMyPasswordUsingOldPasswordForm';

describe('<EnhancedChangeMyPasswordUsingOldPasswordForm />', () => {
    it('should render 1 component correctly', () => {
        const wrapper = shallow(<EnhancedChangeMyPasswordUsingOldPasswordForm/>);
        expect(wrapper.length).toBe(1);
    });
});