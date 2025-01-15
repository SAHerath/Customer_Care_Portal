import React, { useState } from 'react';
import { Link, useRouter, useFocusEffect } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { postRequest } from '../../services/authService';
import { styles } from '../../styles/styles1'; 

export default function LoginScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const { email, password } = formData;
    if (!email || !password ) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setLoading(true);

    const response = await postRequest("auth/login", formData);

    if (response) {
      Alert.alert('Success', 'Login successful!');
      router.replace('/details');
    } else {
      Alert.alert('Error', 'Failed to login.');
    }
    setLoading(false);
  };

  return (
    <SafeAreaProvider>
      <ImageBackground source={require('@/assets/images/abstract.png')} resizeMode="repeat" style={styles.background} >
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
          <View style={styles.innerContainer}>
            <Image source={require('@/assets/images/logo.png')} resizeMode="contain" style={styles.logo} />
            <Text style={styles.title}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
            <Text style={styles.text}>
              <Link href="/register" style={styles.link}>  Sign Up</Link>
            </Text>
            <Text style={styles.text}>
              <Link href="/details" style={styles.link}>Forgot password?</Link>
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
}
