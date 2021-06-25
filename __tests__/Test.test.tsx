import React from 'react';
import renderer from 'react-test-renderer';

import Test from '../src/components/Test';

import 'jest-enzyme';
import 'jest-styled-components';

it('Test component renders', () => {
  const component = <Test />;
  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});
