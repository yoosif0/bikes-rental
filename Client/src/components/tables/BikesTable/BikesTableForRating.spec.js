import renderer from 'react-test-renderer';
import {BikesTableForRating} from './BikesTableForRating';
import React from 'react'



describe('BikesTableForRating', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<BikesTableForRating 
        bikesDetails={[{rate: 4, bike:{model: 'as', color: 'red', _id: 'aa'}}]}
        areReservationsAllowed = {true}
        onAddClick = {()=>{}}
        onEditClick = {()=>{}}
        />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
