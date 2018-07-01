import { shallow } from 'enzyme';
import React from 'react'
import DefaultInput from '../../ui-inputs/DefaultInputLayout';
import { SubmitButton } from '../../buttons/SubmitButton';
import { InnerForm } from './InnerForm';
import { Field } from 'formik';

describe('<InnerForm />', () => {
    it('should render 5 <DefaultInput /> and 5 Field components', () => {
        const wrapper = shallow(<InnerForm errors={{}} touched={{}} isSubmitting={false} dirty={true} />);
        expect(wrapper.find(DefaultInput).length).toBe(5);
        expect(wrapper.find(Field).length).toBe(5);
    });

    it('should render 1 <SubmitButton /> components', () => {
        const wrapper = shallow(<InnerForm errors={{}} touched={{}} isSubmitting={false} dirty={true} />);
        expect(wrapper.find(SubmitButton).length).toBe(1);
    });


});