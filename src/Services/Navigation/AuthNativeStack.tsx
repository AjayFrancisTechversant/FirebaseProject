import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../../Modules/LoginPage';
import RegisterPage from '../../Modules/RegisterPage';

const Stack = createNativeStackNavigator();

const AuthNativeStack = () => {
  return (
    <Stack.Navigator initialRouteName='login'>
    <Stack.Screen
      name="login"
      component={LoginPage}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="register"
      component={RegisterPage}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
  )
}

export default AuthNativeStack