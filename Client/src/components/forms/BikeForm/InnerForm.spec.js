import { shallow } from 'enzyme';
import React from 'react'
import DefaultInput from '../../ui-inputs/DefaultInputLayout';
import { InnerForm } from './InnerForm';
import { Field } from 'formik';

describe('<InnerForm />', () => {
    it('should render 4 <DefaultInput /> and 4 Field components', () => {
        const wrapper = shallow(
        <InnerForm errors={{}} touched={{}} isSubmitting={false} dirty={true} values ={{}}> 
            {
                () => <li> AAAAA </li>
            }
        </InnerForm>);
        expect(wrapper.find(DefaultInput).length).toBe(4);
        expect(wrapper.find(Field).length).toBe(4);
    });


});