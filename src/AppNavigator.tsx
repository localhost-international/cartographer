import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Browser from './components/Browser';


const AppNavigator = createDrawerNavigator(
  {
    Browser: { screen: Browser },
  },
  { 
    initialRouteName: 'Browser' 
  },
);


export default createAppContainer(AppNavigator); 