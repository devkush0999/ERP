import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

// Import screens
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import InventoryScreen from '../screens/Inventory/InventoryScreen';
import HRScreen from '../screens/HR/HRScreen';
import FinanceScreen from '../screens/Finance/FinanceScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2c3e50',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#2c3e50',
        },
        headerTintColor: '#fff',
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: 20 }}>📊</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Inventory" 
        component={InventoryScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: 20 }}>📦</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="HR" 
        component={HRScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: 20 }}>👥</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Finance" 
        component={FinanceScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: 20 }}>💰</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;