import React from 'react';
import renderer from 'react-test-renderer';

import { sum } from '../sum-test';
import Test from '../src/components/Test';

test('adds 1 + 2 to equal 3', () => {
	expect(sum(1, 2)).toBe(3);
});


it('Test renders correctly', () => {
  renderer.create(<Test />);
});

