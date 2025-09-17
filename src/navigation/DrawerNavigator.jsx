import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text } from 'react-native';
import TabNavigator from './TabNavigator';
import SettingsScreen from '../screens/Settings/SettingsScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2c3e50',
        },
        headerTintColor: '#fff',
        drawerActiveTintColor: '#2c3e50',
        drawerInactiveTintColor: 'gray',
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={TabNavigator} 
        options={{
          drawerIcon: ({ color, size }) => (
            <Text style={{ fontSize: 20 }}>🏠</Text>
          ),
        }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          drawerIcon: ({ color, size }) => (
            <Text style={{ fontSize: 20 }}>⚙️</Text>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;