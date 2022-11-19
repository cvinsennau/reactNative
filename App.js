import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import HomeMenu from './src/components/HomeMenu';
import Portada from './src/screens/Portada';
import Profile from './src/screens/Profile';
import EliminarPerfil from './src/screens/EliminarPerfil'

const Stack = createNativeStackNavigator();

function App() {
  return (
    //Plantear la navegación
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Portada" options= {{ headerShown : false}}  component={ Portada} />
      <Stack.Screen name="Register" options= {{ headerShown : false}} component={ Register } />
      <Stack.Screen name="Login" options= {{ headerShown : false}} component={ Login } />
      <Stack.Screen name="HomeMenu" options= {{ headerShown : false}} component={ HomeMenu } />
      <Stack.Screen name="Profile" options= {{ headerShown : false}} component={Profile} />
      <Stack.Screen name="EliminarPerfil" options= {{ headerShown : false}} component={EliminarPerfil} />

      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

export default App;