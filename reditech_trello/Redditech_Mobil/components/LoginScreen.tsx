import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Header from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CONSUMER_KEY = "7b93013e7bca6cdddbd361250fef6396";
const TRELLO_REDIRECT_URI = "exp://192.168.2.180:8081";

const authUrl = `https://trello.com/1/authorize?response_type=code&key=${CONSUMER_KEY}&redirect_uri=${TRELLO_REDIRECT_URI}&scope=read,write&expiration=never&name=Redditech_Mobil`;
export default function LoginScreen() {
  const [token, setToken] = useState<string | null>(null);
  const handleOAuthLogin = () => {
    setTimeout(() => {
      router.replace('./boards');
    }, 1000);
  };
  const handleLogin = async () => {
    try {
      const supported = await Linking.canOpenURL(authUrl);
      if (supported) {
        await Linking.openURL(authUrl);
      } else {
        Alert.alert(`Impossible d'ouvrir l'URL: ${authUrl}`);
      }
    } catch (error) {
      console.log(error);
      

      Alert.alert("Une erreur s'est produite lors de l'ouverture de l'URL");
    }
  };
  React.useEffect(() => {
    const handleDeepLink = async  (event: { url: string }) => {
      const tokenMatch = event.url.match(/token=([a-zA-Z0-9]+)/);
      if (tokenMatch && tokenMatch[1]) {
        setToken(tokenMatch[1]);
        Alert.alert(
          "Authentification réussie",
          // `Votre jeton: ${tokenMatch[1]}`
        );
        await AsyncStorage.setItem('userToken', tokenMatch[1]);
      }
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Login" />
      
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Ionicons name="list" size={80} color="#0052CC" />
          <Text style={styles.title}>TrellTech</Text>
          <Text style={styles.subtitle}>Gestion de projet simplifiée</Text>
        </View>

        <View style={styles.loginSection}>
          <TouchableOpacity style={styles.oauthButton}  onPress={() => { handleLogin(); handleOAuthLogin(); }}>
            {/* <Button title="" onPress={handleLogin} /> */}
            <Ionicons name="lock-open-outline" size={24} color="#fff" />
            <Text style={styles.oauthButtonText}>Se connecter avec Trello</Text>
          </TouchableOpacity>

          <Text style={styles.infoText}>
            Connectez-vous avec votre compte Trello pour accéder à vos tableaux et espaces de travail.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#172B4D',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B778C',
    marginTop: 8,
  },
  loginSection: {
    alignItems: 'center',
  },
  oauthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0052CC',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  oauthButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  infoText: {
    textAlign: 'center',
    color: '#6B778C',
    fontSize: 14,
    lineHeight: 20,
  },
});