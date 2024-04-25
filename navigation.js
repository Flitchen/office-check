import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Admin,
  Login,
  Splash,
  Home,
  AddEmployee,
  AllUsers,
  PasswordChange,
} from "./screens";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Splash"}
        screenOptions={{ headerShown: false, headerBackVisible: false }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="AddEmployee" component={AddEmployee} />
        <Stack.Screen name="AllUsers" component={AllUsers} />
        <Stack.Screen name="PasswordChange" component={PasswordChange} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
