/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Animated } from 'react-native';

// Import screens
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import InventoryScreen from '../screens/Inventory/InventoryScreen';
import HRScreen from '../screens/HR/HRScreen';
import FinanceScreen from '../screens/Finance/FinanceScreen';

const Tab = createBottomTabNavigator();

// Glassmorphism Tab Bar Icon Component
const GlassmorphismTabBarIcon = ({ source, focused, color, size, tabName }) => {
  const scaleValue = React.useRef(new Animated.Value(focused ? 1.1 : 1)).current;
  const glowOpacity = React.useRef(new Animated.Value(focused ? 1 : 0)).current;
  const blurOpacity = React.useRef(new Animated.Value(focused ? 1 : 0)).current;

  React.useEffect(() => {
    if (focused) {
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1.1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(glowOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(blurOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(glowOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(blurOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [focused]);

  const getTabColor = () => {
    switch (tabName) {
      case 'Dashboard':
        return '#007AFF'; // iOS Blue
      case 'Inventory':
        return '#FF3B30'; // iOS Red
      case 'HR':
        return '#34C759'; // iOS Green
      case 'Finance':
        return '#FF9500'; // iOS Orange
      default:
        return '#007AFF';
    }
  };

  return (
    <View style={{ 
      alignItems: 'center', 
      justifyContent: 'center',
      width: 60,
      height: 60,
    }}>
      {/* Glass Background with Blur Effect */}
      <Animated.View
        style={{
          position: 'absolute',
          width: 50,
          height: 50,
          borderRadius: 16,
          backgroundColor: 'rgba(234, 185, 185, 0.15)',
          backdropFilter: 'blur(20px)', // Note: This works on iOS
          borderWidth: 0.5,
          borderColor: 'rgba(255, 255, 255, 0.2)',
          opacity: blurOpacity,
          transform: [{ scale: scaleValue }],
          shadowColor: getTabColor(),
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      />

      {/* Subtle Inner Glow */}
      <Animated.View
        style={{
          position: 'absolute',
          width: 44,
          height: 44,
          borderRadius: 44,
          backgroundColor: `${getTabColor()}20`,
          opacity: glowOpacity,
          transform: [{ scale: scaleValue }],
        }}
      />

      {/* Light Reflection Effect */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 8,
          left: 12,
          width: 20,
          height: 8,
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          opacity: Animated.multiply(blurOpacity, 0.6),
          transform: [{ scale: scaleValue }],
        }}
      />
      
      {/* Icon */}
      <Animated.Image
        source={source}
        style={{
          width: size,
          height: size,
          tintColor: focused ? getTabColor() : color,
          transform: [{ scale: scaleValue }],
          zIndex: 10,
        }}
        resizeMode="contain"
      />
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#1D1D1F', // Apple's dark text color
        tabBarInactiveTintColor: '#8E8E93', // Apple's secondary text color
        headerStyle: {
          backgroundColor: 'rgba(246, 98, 98, 0.94)', // Apple's translucent header
          backdropFilter: 'blur(20px)',
          borderBottomWidth: 0.5,
          borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        },
        headerTintColor: '#1D1D1F',
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(68, 117, 242, 0.94)', // Translucent white
          backdropFilter: 'blur(40px)', // Blur effect
          borderTopWidth: 0.5,
          borderTopColor: 'rgba(0, 0, 0, 0.1)',
          elevation: 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -1,
          },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          height: 90,
          paddingBottom: 25,
          paddingTop: 10,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500', // Apple's medium weight
          marginTop: 4,
          fontFamily: 'System', // Use system font
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <GlassmorphismTabBarIcon
              source={require('../../src/assets/images/google.png')}
              focused={focused}
              color={color}
              size={24}
              tabName="Dashboard"
            />
          ),
          headerShown: false, // Hide header for cleaner look
        }}
      />
      <Tab.Screen 
        name="Inventory" 
        component={InventoryScreen} 
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <GlassmorphismTabBarIcon
              source={require('../../src/assets/images/google.png')}
              focused={focused}
              color={color}
              size={24}
              tabName="Inventory"
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="HR" 
        component={HRScreen} 
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <GlassmorphismTabBarIcon
              source={require('../../src/assets/images/home.png')}
              focused={focused}
              color={color}
              size={24}
              tabName="HR"
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Finance" 
        component={FinanceScreen} 
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <GlassmorphismTabBarIcon
              source={require('../../src/assets/images/google.png')}
              focused={focused}
              color={color}
              size={24}
              tabName="Finance"
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;