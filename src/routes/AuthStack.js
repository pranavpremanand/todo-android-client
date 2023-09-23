import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Group>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Group>
  );
};
