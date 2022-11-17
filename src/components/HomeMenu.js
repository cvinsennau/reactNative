import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';
import Search from '../screens/Search';

import { FontAwesome, Octicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

function HomeMenu(){
    return(
      <Tab.Navigator

      
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false
        }}>


        <Tab.Screen 
          name="Home" 
          component={ Home } 
          options={
            {tabBarIcon: () => <FontAwesome name="home" size={26} />}
          } />

        <Tab.Screen 
        name="Crear Posteo" 
        component={ NewPost } 
        options={
          {tabBarIcon: () => <FontAwesome name="camera" size={26} />}
        }/>

        <Tab.Screen 
          name="Mi Perfil" 
          component={ Profile } 
          options={
            {tabBarIcon: () => <FontAwesome name="user-o" size={26} />}
        }/>

      <Tab.Screen 
          name="Buscar" 
          component={ Search } 
          options={
            {tabBarIcon: () => <Octicons name="search" size={26} />}
        }/>


    </Tab.Navigator>
    )   
}

export default HomeMenu;