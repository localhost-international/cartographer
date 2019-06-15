import { 
  // createStackNavigator,
  // createBottomTabNavigator,
  createDrawerNavigator,
  createAppContainer, 
} from 'react-navigation';

import Intro from 'src/views/Intro';
import Browser from 'src/views/Browser';
import Settings from 'src/views/Settings';
import About from 'src/views/About';


const AppNavigator = createDrawerNavigator(
  {
    Intro: { screen: Intro },
    Browser: { screen: Browser },
    Settings: { screen: Settings }, 
    About: { screen: About }, 
  },
  { 
    initialRouteName: 'Browser' 
  },
);


export default createAppContainer(AppNavigator);