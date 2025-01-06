import React, { useState } from 'react';
import { Link } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { styles } from '../styles/styles1'; 

export default function forgotpasswordScreen() {
  const [formData, setFormData] = useState({ email: ''});
  const [loading, setLoading] = useState(false);

  const handlefoget = async () => {
    setLoading(true);
    setTimeout(() => {
      if (formData.email === 'test@test.com') {
        Alert.alert('Login successful!');
      } else {
        Alert.alert('Login failed', 'Invalid email');
      }
      setLoading(false);
    }, 2000);

  };

  return (
    <SafeAreaProvider>
      <ImageBackground source={require('@/assets/images/abstract.png')} resizeMode="repeat" style={styles.background} >
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
          <View style={styles.innerContainer}>
            <Image source={require('@/assets/images/logo.png')} resizeMode="contain" style={styles.logo} />
            <Text style={styles.title}>Password Reset</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
            <TouchableOpacity style={styles.button} onPress={handlefoget} disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Send Request</Text>
              )}
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
}
