import React, { useState } from 'react';
import { Link, useRouter, useFocusEffect } from 'expo-router';
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
import { postRequest } from '../../services/authService';
import { styles } from '../../styles/styles1'; 

export default function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({firstName: '', lastName: '', email: '', phoneNumber: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const { firstName, lastName, email, phoneNumber, password, confirmPassword } = formData;
    if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    setLoading(true);

    const response = await postRequest("auth/register", formData);
  
    if (response) {
      Alert.alert('Success', 'Registration successful!');
      router.replace('/login');
    } else {
      Alert.alert('Error', 'Failed to register.');
    }
    setLoading(false);
  };

  return (
    <SafeAreaProvider>
      <ImageBackground source={require('@/assets/images/abstract.png')} resizeMode="repeat" style={styles.background} >
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
          <View style={styles.innerContainer}>
            <Image source={require('@/assets/images/logo.png')} resizeMode="contain" style={styles.logo} />
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={formData.firstName}
              onChangeText={(text) => setFormData({ ...formData, firstName: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={formData.lastName}
              onChangeText={(text) => setFormData({ ...formData, lastName: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Contact Number"
              value={formData.phoneNumber}
              onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={formData.confirmPassword}
              onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Register</Text>
              )}
            </TouchableOpacity>
            <Text style={styles.text}>
              Already have an account?
              <Link href="/" style={styles.link}>  Login</Link>
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
}
