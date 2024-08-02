import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {ScreenContextProvider} from './src/Contexts/ScreenContext';
import AuthNativeStack from './src/Services/Navigation/AuthNativeStack';
import HomeScreen from './src/Modules/HomeScreen';
import {PaperProvider} from 'react-native-paper';
import BottomTabStack from './src/Services/Navigation/BottomTabStack';
import Firestore from './src/Modules/Firestore';

type RootStackParamList = {
  authNativeStack: undefined;
  bottomTabStack: undefined;
};

const RootNativeStack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {!initializing ? (
        <NavigationContainer>
          <RootNativeStack.Navigator>
            {!user ? (
              <RootNativeStack.Screen
                name="authNativeStack"
                component={AuthNativeStack}
                options={{headerShown: false} as NativeStackNavigationOptions}
              />
            ) : (
              <RootNativeStack.Screen
                name="bottomTabStack"
                component={BottomTabStack}
                options={{headerShown: false} as NativeStackNavigationOptions}
              />
            )}
          </RootNativeStack.Navigator>
        </NavigationContainer>
      ) : (
        <ActivityIndicator />
      )}
    </SafeAreaView>
  );
}

const Main = () => {
  return (
    <ScreenContextProvider>
      <PaperProvider>
        <App />
        {/* <Firestore/> */}
      </PaperProvider>
    </ScreenContextProvider>
  );
};

export default Main;
