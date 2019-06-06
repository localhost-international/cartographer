import { 
  // createStackNavigator,
  // createBottomTabNavigator,
  createDrawerNavigator,
  createAppContainer, 
} from 'react-navigation';

import HomeScreen from 'src/HomeScreen';
import BrowserScreen from 'src/BrowserScreen';


const AppNavigator = createDrawerNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    BrowserScreen: { screen: BrowserScreen },
  },
  { 
    initialRouteName: 'HomeScreen' // 'BrowserScreen' 
  },
);


export default createAppContainer(AppNavigator);