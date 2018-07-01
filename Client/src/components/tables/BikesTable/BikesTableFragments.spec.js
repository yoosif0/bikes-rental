import React from 'react';
import renderer from 'react-test-renderer';
import { BasicTableDescription } from './BikesTableFragments';



describe('BasicTableDescription', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<BasicTableDescription item={{imageName:"dsa", model: 'tx'}}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
