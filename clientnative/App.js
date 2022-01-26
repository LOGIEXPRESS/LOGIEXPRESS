import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { StripeProvider } from "@stripe/stripe-react-native";
import { store } from "./store/index";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SingIn from "./Components/SingIn";
import SingUp from "./Components/SingUp";
import EditProfile from "./Components/Editares/EditProfile";
import EditProfileCarrier from "./Components/Editares/EditProfileCarrier";
import CompleteProfileUser from "./Components/CompletarPerfil/CompleteProfileUser";
import CompleteProfileCarrier from "./Components/CompletarPerfil/CompleteProfileCarrier";
import ProfileUserScreen from "./Components/ProfileUserScreen";
import ProfileScreenCarrier from "./Components/ProfileScreenCarrier";
import ScreenMap from "./Components/ScreenMap";
import RequestTravel from "./Components/RequestTravel";
import DatosPersonalesCarrier from "./Components/Datos/DatosPersonalesCarrier";
import DatosPersonalesUser from "./Components/Datos/DatosPersonalesUser";
import StartCarrier from "./Components/ComenzarViaje/StartCarrier";
import ScreenWaiting from "./Components/ScreenWaiting";
import PaymentApp from "./Components/Payment/PaymentApp";
import StartUser from "./Components/ComenzarViaje/StartUser";
import EditVehicule from "./Components/Editares/EditVehicule";
import CotizarViaje from "./Components/CotizarViaje";
import Home from "./Components/home";
import CambiarContraseña from "./Components/CambiodeContraseña/CambiarContraseña";
import DetallesVehicule from "./Components/Detalles/DetallesVehicule";
import HistorialDeViaje from "./Components/HistorialDeViaje/HistorialDeViaje";
import reviewUser from "./Components/Review/ReviewUser"
import reviewCarrier from "./Components/Review/ReviewCarrier"
import Chat from './Components/Chat/Chat.js'
import HistorialDeViajeCarrier from "./Components/HistorialDeViaje/HistorialDeViajeCarrier";
import { LogBox } from 'react-native';


const Stack = createStackNavigator();

const App = () => {
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  ]);
  
  return (
    <StripeProvider publishableKey="pk_test_51KHwMJH58Ljah9wGjMPQ9Os5fhEj5awCKf7ARtjrqcwUFGAVniXX5CTP3fP492gqrJv3MerKLDbnAByXzpPkYWsC00P8X1yX8l">
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
       
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="singIn"
              component={SingIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="singUp" component={SingUp} />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditProfileCarrier"
              component={EditProfileCarrier}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditVehicule"
              component={EditVehicule}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="CompleteProfileUser"
              component={CompleteProfileUser}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CompleteProfileCarrier"
              component={CompleteProfileCarrier}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfileScreenCarrier"
              component={ProfileScreenCarrier}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ScreenMap"
              component={ScreenMap}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfileUserScreen"
              component={ProfileUserScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RequestTravel"
              component={RequestTravel}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PaymentApp"
              component={PaymentApp}
              options={{ hederShown: false }}
            />
            <Stack.Screen
              name="DatosPersonalesCarrier"
              component={DatosPersonalesCarrier}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DatosPersonalesUser"
              component={DatosPersonalesUser}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="StartUser"
              component={StartUser}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="CotizarViaje"
              component={CotizarViaje}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="CambiarContraseña"
              component={CambiarContraseña}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DetallesVehicule"
              component={DetallesVehicule}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HistorialDeViaje"
              component={HistorialDeViaje}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HistorialDeViajeCarrier"
              component={HistorialDeViajeCarrier}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Chat"
              component={Chat}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
            name="ScreenWaiting" 
            component={ScreenWaiting} 
            options={{ headerShown: false }}
            />
            <Stack.Screen 
            name="StartCarrier" 
            component={StartCarrier} 
            options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ReviewUser"
              component={reviewUser}
              options={{ headerShown: false }}
            />
              <Stack.Screen
              name="ReviewCarrier"
              component={reviewCarrier}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </StripeProvider>
  );
};
export default App;
