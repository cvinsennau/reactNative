import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login'
import Register from './src/screens/Register'
import HomeMenu from './src/components/HomeMenu';
<<<<<<< HEAD
import Portada from './src/screens/Portada'
=======
>>>>>>> 58fc05014d269001f4445c3093f7c5e548b8be6c

const Stack = createNativeStackNavigator();

function App() {
  return (
    //Plantear la navegación
    <NavigationContainer>
<<<<<<< HEAD
      <Stack.Navigator>
      <Stack.Screen name="Portada" options= {{ headerShown : false}}  component={ Portada} />
      <Stack.Screen name="Register" options= {{ headerShown : false}} component={ Register } />
      <Stack.Screen name="Login" options= {{ headerShown : false}} component={ Login } />
=======
      <Stack.Navigator
      
      screenOptions={{
        headerShown: false
      }}>

      <Stack.Screen name="Register" component={ Register } />
      <Stack.Screen name="Login" component={ Login } />
>>>>>>> 58fc05014d269001f4445c3093f7c5e548b8be6c
      <Stack.Screen name="HomeMenu" component={ HomeMenu } />

      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

export default App;