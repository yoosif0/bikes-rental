import { StarRatingTableDescription } from './StarRatingTableDescription';
import renderer from 'react-test-renderer';
import React from 'react'



describe('StarRatingTableDescription', () => {
  fit('should match snapshot', () => {
    const tree = renderer.create(<StarRatingTableDescription 
        id="s"
        rate={4}
        onRateClick={()=>(<li>C</li>)}
        />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
