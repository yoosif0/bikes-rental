import renderer from 'react-test-renderer';
import React from 'react'
import { MyPreviouslyUsedBikesTable } from './MyPreviouslyUsedBikesTable';


describe('MyPreviouslyUsedBikesTable', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<MyPreviouslyUsedBikesTable 
        bikesDetails={[{rate: 4, bike:{model: 'as', color: 'red', _id: 'aa'}}]}
        areReservationsAllowed = {true}
        onAddClick = {()=>{}}
        onEditClick = {()=>{}}
        />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
