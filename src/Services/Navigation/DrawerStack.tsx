import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../Modules/HomeScreen';

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
  <Drawer.Navigator>
    <Drawer.Screen name='HomeScreen' component={HomeScreen}/>
  </Drawer.Navigator>
  )
}

export default DrawerStack