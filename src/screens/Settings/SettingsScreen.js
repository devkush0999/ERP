import React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';

const SettingsScreen = () => {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>Notifications</Text>
          <Text style={styles.settingDescription}>Enable push notifications</Text>
        </View>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
        />
      </View>
      
      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>Dark Mode</Text>
          <Text style={styles.settingDescription}>Switch to dark theme</Text>
        </View>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
        />
      </View>
      
      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>Account Settings</Text>
          <Text style={styles.settingDescription}>Update your account information</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </View>
      
      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>Privacy & Security</Text>
          <Text style={styles.settingDescription}>Manage your privacy settings</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f7fb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  arrow: {
    fontSize: 24,
    color: '#7f8c8d',
  },
});

export default SettingsScreen;