import renderer from 'react-test-renderer';
import {BikesTableLayout} from './BikesTableLayout';
import React from 'react'



describe('BikesTableLayout', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<BikesTableLayout 
        TableHeaders={()=>(<li>HH</li>)}
        TableBodyContent={()=>(<li>C</li>)}
        />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
