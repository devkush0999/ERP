import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const DashboardScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sales Overview</Text>
        <Text style={styles.cardValue}>$42,567</Text>
        <Text style={styles.cardChange}>+12% from last month</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Inventory Status</Text>
        <Text style={styles.cardValue}>1,245 Items</Text>
        <Text style={styles.cardChange}>23 low stock items</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Employee Stats</Text>
        <Text style={styles.cardValue}>84 Active</Text>
        <Text style={styles.cardChange}>3 on leave</Text>
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
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  cardChange: {
    fontSize: 14,
    color: '#27ae60',
    marginTop: 4,
  },
});

export default DashboardScreen;