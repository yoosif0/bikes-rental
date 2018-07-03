import { Com } from './StarRatingTableDescription';
import renderer from 'react-test-renderer';
import React from 'react'



describe('StarRatingTableDescription', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<Com 
        id="s"
        rate={4}
        onRateClick={()=>(<li>C</li>)}
        />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
