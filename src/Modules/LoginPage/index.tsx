import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {useScreenContext} from '../../Contexts/ScreenContext';
import StaticVariables from '../../Preferences/StaticVariables';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {useNavigation} from '@react-navigation/native';
import styles from './style';

const LoginPage: React.FC = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    email: StaticVariables.EMPTY_STRING,
    password: StaticVariables.EMPTY_STRING,
  });
  const [guestloginLoading, setGuestloginLoading] = useState(false);

  const handleLogin = () => {
    if (!userData.email || !userData.password) {
      Alert.alert('Please fill the form completeley!!!');
    } else {
      auth()
        .signInWithEmailAndPassword(userData.email, userData.password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          Alert.alert(error.message);
        });
    }
  };
  const handleGuest = () => {
    setGuestloginLoading(true);
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch(error => {
        Alert.alert(error.message);
        console.log(error);
        
      }).finally(()=>setGuestloginLoading(false))
  };
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );

  return (
    <KeyboardAvoidingView
      style={screenStyles.container}
      enabled={true}
      behavior="height"
      keyboardVerticalOffset={50}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={screenStyles.heading}> Log In</Text>
        <TextInput
          style={screenStyles.textInput}
          onChangeText={e => setUserData({...userData, email: e})}
          mode="outlined"
          label="Email"
          selectionColor={ColorPalette.green}
          underlineColor={ColorPalette.green}
          activeUnderlineColor={ColorPalette.green}
          outlineColor={ColorPalette.green}
          activeOutlineColor={ColorPalette.green}
        />
        <TextInput
          style={screenStyles.textInput}
          secureTextEntry
          onChangeText={e => setUserData({...userData, password: e})}
          mode="outlined"
          label="Password"
          selectionColor={ColorPalette.green}
          underlineColor={ColorPalette.green}
          activeUnderlineColor={ColorPalette.green}
          outlineColor={ColorPalette.green}
          activeOutlineColor={ColorPalette.green}
        />
        <TouchableOpacity onPress={handleLogin}>
          <View style={screenStyles.button}>
            <Text style={screenStyles.buttonText}>Login</Text>
          </View>
        </TouchableOpacity>
        <View style={screenStyles.lastViewContainer}>
          <Text>New User? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('register' as never)}>
            <Text style={screenStyles.greenUnderlinetext}>Register</Text>
          </TouchableOpacity>
        </View>
        <Text style={screenStyles.selfAlignCenter}>
          -------------------------------- Or --------------------------------
        </Text>

        <View style={screenStyles.lastViewContainer}>
          <Text>Continue as </Text>
          {!guestloginLoading?<TouchableOpacity onPress={handleGuest}>
            <Text style={screenStyles.greenUnderlinetext}>Guest</Text>
          </TouchableOpacity>
          :
          <ActivityIndicator/>
          }
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;
