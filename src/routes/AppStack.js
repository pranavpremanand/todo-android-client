import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppTabs} from './AppTabs';

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  return <Stack.Screen name="AppTabs" component={AppTabs} />;
};
