import * as React from 'react';
import * as ReactNative from 'react-native';
import renderer from 'react-test-renderer';

import Test from '../src/components/Test';
import App from '../App';

import { ButtonIcon } from '../src/components/ButtonIcon';
import IconOptions from 'src/assets/icons/icon-options.svg';

import { shallow, mount } from 'enzyme'
import 'jest-enzyme'
import 'jest-styled-components'


// const button = {
//   type: 'options',
//   onPress: () => {},
//   iconImage: IconOptions,
//   accessibilityLabel: 'More Options'
// }


// it('icon button renders', () => {
//   const { type, iconImage, accessibilityLabel, onPress } = button;
//   const component = 
//     <ButtonIcon
//       type={type}
//       key={`${button + type}`}
//       accessibilityLabel={accessibilityLabel}
//       onPress={onPress}
//       iconImage={iconImage}
//     />
//   const tree = renderer.create(component).toJSON()
//   expect(tree).toMatchSnapshot()
// });


it('Test component renders', () => {
  const component = <Test />
  const tree = renderer.create(component).toJSON()
  expect(tree).toMatchSnapshot()
});