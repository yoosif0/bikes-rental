import renderer from 'react-test-renderer';
import {InnerForm} from './InnerForm';
import React from 'react'



describe('InnerForm', () => {
  fit('should match snapshot', () => {
    const tree = renderer.create(<InnerForm 
        errors={{}}
        handleSubmit={()=>{}}
        touched={{}}
        isSubmitting={false}
        dirty={true}
        />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
