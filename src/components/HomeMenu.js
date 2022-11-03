import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';

const Tab = createBottomTabNavigator();

function HomeMenu(){
    return(
      <Tab.Navigator

      screenOptions={{
        headerShown: false
      }}>

        <Tab.Screen name="Home" component={ Home } />
        <Tab.Screen name="Mi Perfil" component={ Profile } />
        <Tab.Screen name="Crear Posteo" component={ NewPost } />

    </Tab.Navigator>
    )   
}

export default HomeMenu;