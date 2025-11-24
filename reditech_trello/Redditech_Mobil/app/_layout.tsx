import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import SplashScreen from '../components/SplashScreen';

export default function RootLayout() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const handleSplashComplete = () => {
    setIsSplashVisible(false);
  };

  if (isSplashVisible) {
    return <SplashScreen onAnimationComplete={handleSplashComplete} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="boards" />
      <Stack.Screen name="create-board" />
      <Stack.Screen name="liste" />
      <Stack.Screen name="create-card" />
      <Stack.Screen name="card-detail" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="test" />
    </Stack>
  );
}