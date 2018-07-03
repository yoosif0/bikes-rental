import renderer from 'react-test-renderer';
import { PageContentLayout } from './PageContentLayout';
import React from 'react'


describe('PageContentLayout', () => {
    it('should match snapshot', () => {
      const tree = renderer.create(<PageContentLayout  isRendering={true} unAvailabilityText="not available"> <li>Hey</li></PageContentLayout>).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  