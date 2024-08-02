import {Text, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import React from 'react';

const LogoutComponent = () => {
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  return (
    <TouchableOpacity onPress={handleLogout}>
      <Text>Logout</Text>
    </TouchableOpacity>
  );
};

export default LogoutComponent;
