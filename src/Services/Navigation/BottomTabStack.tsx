import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import DrawerStack from './DrawerStack';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import Firestore from '../../Modules/Firestore';

const BottomTab = createBottomTabNavigator();

const BottomTabStack = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{tabBarActiveTintColor: ColorPalette.orange}}>
      <BottomTab.Screen
        name="DrawerStack"
        component={DrawerStack}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Firestore"
        component={Firestore}
        options={{
          title: 'Firestore',
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabStack;
