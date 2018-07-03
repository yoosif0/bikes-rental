import renderer from 'react-test-renderer';
import { SubmitButton } from './SubmitButton';
import React from 'react'


describe('SubmitButton', () => {
    it('should match snapshot', () => {
      const tree = renderer.create(<SubmitButton label="Submit" disabled={true} classNames="default"/>).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  