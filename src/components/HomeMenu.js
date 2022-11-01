import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';

const Tab = createBottomTabNavigator();

function HomeMenu(){
    <Tab.Navigator>
        <Tab.Screen name="Home" component={ Home } />
        <Tab.Screen name="Profile" component={ Profile } />
        <Tab.Screen name="NewPost" component={ NewPost } />
    </Tab.Navigator>
}

export default HomeMenu;