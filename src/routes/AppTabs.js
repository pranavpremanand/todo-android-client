/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import Home from '../components/Home/Home';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../components/Profile/Profile';
import {commonStyles} from '../styles/commonStyles';
import {options} from '../App';
import {trigger} from 'react-native-haptic-feedback';
import Settings from '../components/Settings/Settings';

const Tabs = createBottomTabNavigator();

export const AppTabs = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {fontSize: 12, paddingBottom: 3},
        tabBarItemStyle: {paddingVertical: 1},
        tabBarActiveTintColor: commonStyles.blueBg,
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({size, color}) => (
            <Icon name="home" size={28} color={color} />
          ),
        }}
        listeners={{tabPress: () => trigger('soft', options)}}
      />
      <Tabs.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
          tabBarIcon: ({size, color}) => (
            <Ionicons name="settings-sharp" size={28} color={color} />
          ),
        }}
        listeners={{tabPress: () => trigger('soft', options)}}
      />
    </Tabs.Navigator>
  );
};
