import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
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

export default function forgotpasswordScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: ''});
  const [loading, setLoading] = useState(false);

  const handlefoget = async () => {
    const { email } = formData;
    if (!email ) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setLoading(true);

    const response = await postRequest("auth/forgotPassword", formData);

    if (response) {
      Alert.alert('Success', 'Request sent. Please check your email.');
      router.replace('/details');
    } else {
      Alert.alert('Error', 'Failed to send request.');
    }
    setLoading(false);

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
