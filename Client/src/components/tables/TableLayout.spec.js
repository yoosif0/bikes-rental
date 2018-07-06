import renderer from 'react-test-renderer';
import {TableLayout} from './TableLayout';
import React from 'react'



describe('TableLayout', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<TableLayout 
        TableHeaders={()=>(<li>HH</li>)}
        TableBodyContent={()=>(<li>C</li>)}
        />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
