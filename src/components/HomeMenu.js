import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';

const Tab = createBottomTabNavigator();

function HomeMenu(){

    <Tab.Navigator
    
    screenOptions={{
        headerShown: false
      }}>ç

        <Tab.Screen name="Home" component={ Home } />

    </Tab.Navigator>
}

export default HomeMenu;