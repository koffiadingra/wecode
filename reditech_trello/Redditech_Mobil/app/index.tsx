import { Redirect } from 'expo-router';
import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    // Pour l'instant, on simule une vérif
    // Plus tard, on vérifiera le token OAuth
    setTimeout(() => {
      setIsAuthenticated(false); // Change à true si déjà connecté
    }, 1000);
  };

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
        <ActivityIndicator size="large" color="#0052CC" />
        <Text style={{ marginTop: 10 }}>Chargement...</Text>
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/boards" />;
  }

  return <Redirect href="/login" />;

}