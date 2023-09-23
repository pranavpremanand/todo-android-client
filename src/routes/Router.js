import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthStack} from './AuthStack';
import {AppStack} from './AppStack';
import {ActivityIndicator} from 'react-native';
import {commonStyles} from '../styles/commonStyles';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppTabs} from './AppTabs';
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();
export const Router = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserExist, setIsUserExist] = useState(false);
  const {isLoggedIn} = useSelector(state => state.user);
  const navigation = useNavigation();

  const checkUserExist = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('token');
    setIsUserExist(Boolean(token));
    return setIsLoading(false);
  };

  useEffect(() => {
    checkUserExist();
  }, [isLoggedIn, navigation]);

  if (isLoading) {
    return <ActivityIndicator size={'large'} color={commonStyles.blueBg} />;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isUserExist ? (
        <Stack.Screen name="AppTabs" component={AppTabs} />
      ) : (
        <Stack.Group>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
