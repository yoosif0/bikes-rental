import renderer from 'react-test-renderer';
import BikesTable from './BikesTable';
import React from 'react'



describe('BasicTableDescription', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<BikesTable 
        bikes={[{model: 'as', color: 'red', _id: 'aa'}]}
        areReservationsAllowed = {true}
        onAddClick = {()=>{}}
        onEditClick = {()=>{}}
        />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
