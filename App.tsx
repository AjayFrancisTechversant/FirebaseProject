import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {ScreenContextProvider} from './src/Contexts/ScreenContext';
import AuthNativeStack from './src/Services/Navigation/AuthNativeStack';
import HomeScreen from './src/Modules/HomeScreen';
import {PaperProvider} from 'react-native-paper';

type RootStackParamList = {
  authNativeStack: undefined;
  homeScreen: undefined;
};

const RootNativeStack = createNativeStackNavigator<RootStackParamList>();
function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <RootNativeStack.Navigator>
          <RootNativeStack.Screen
            name="authNativeStack"
            component={AuthNativeStack}
            options={{headerShown: false} as NativeStackNavigationOptions}
          />
          <RootNativeStack.Screen
            name="homeScreen"
            component={HomeScreen}
            options={{headerShown: false} as NativeStackNavigationOptions}
          />
        </RootNativeStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const Main = () => {
  return (
    <ScreenContextProvider>
      <PaperProvider>
        <App />
      </PaperProvider>
    </ScreenContextProvider>
  );
};

export default Main;
