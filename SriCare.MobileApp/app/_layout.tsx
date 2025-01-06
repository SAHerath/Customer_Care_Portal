import { Stack } from 'expo-router';  

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#9F774E',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="register" />
      <Stack.Screen name="details" />
    </Stack>
  );
}
