import { shallow } from 'enzyme';
import React from 'react'
import DefaultInput from '../../ui-inputs/DefaultInputLayout';
import { SubmitButton } from '../../buttons/SubmitButton';
import { InnerForm } from './InnerForm';

describe('<InnerForm />', () => {
    it('should render 3 <DefaultInput /> components', () => {
        const wrapper = shallow(<InnerForm errors={{}} touched={{}} isSubmitting={false} dirty={true} />);
        expect(wrapper.find(DefaultInput).length).toBe(3);
    });

    it('should render 1 <SubmitButton /> components', () => {
        const wrapper = shallow(<InnerForm errors={{}} touched={{}} isSubmitting={false} dirty={true} />);
        expect(wrapper.find(SubmitButton).length).toBe(1);
    });


});