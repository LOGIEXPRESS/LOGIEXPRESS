import React from "react";
import {Provider} from 'react-redux'
import {store} from './store/index'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SingIn from "./Components/SingIn";
import SingUp from "./Components/SingUp";
import EditProfile from './Components/EditProfile';
import EditProfileCarrier from "./Components/EditProfileCarrier";
import EditVehiculeCarrier from "./Components/EditVehiculeCarrier";

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="singIn"
          component={SingIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="singUp" component={SingUp} />
        <Stack.Screen 
        name='EditProfile' 
        component={EditProfile}
        options={{ headerShown: false}}/> 
        <Stack.Screen 
        name='EditProfileCarrier' 
        component={EditProfileCarrier}
        options={{ headerShown: false}}/>      
        <Stack.Screen 
        name='EditVehiculeCarrier' 
        component={EditVehiculeCarrier}
        options={{ headerShown: false}}/> 
      </Stack.Navigator>
      
    </NavigationContainer>
    </Provider>
  );
};
export default App;
