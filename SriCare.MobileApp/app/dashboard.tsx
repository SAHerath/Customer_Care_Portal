import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { logout } from '../services/authService';

export default function DashboardScreen() {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      // const currentUser = await getCurrentUser();
      // setUser(currentUser);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    Alert.alert('Success', 'You have been logged out.');
    router.replace('/login'); // Redirect to login screen after logout
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {user || 'Guest'}!</Text>
      <Button title="Logout" onPress={handleLogout} color="#007bff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
});

