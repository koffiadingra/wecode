import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import axios from 'axios';
import Header from './Header';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  username: string;
  bio?: string;
}

const TRELLO_API_KEY = 'e541609eba1502b2d0ec748783a47fe4';
const TRELLO_API_TOKEN = 'ATTA069b18ffe82d1775744d944e91da68bc61992fcb52a6fb766c737e46a0c450418CF6D37F';

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userStats, setUserStats] = useState({
    boards: 0,
    cards: 0,
    workspaces: 0
  });

  const handleBack = () => {
    router.back();
  };

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const userResponse = await axios.get(
        `https://api.trello.com/1/members/me?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`
      );

      const userData = userResponse.data;
      
      const userInfo: User = {
        id: userData.id,
        name: userData.fullName || userData.username,
        email: userData.email || `${userData.username}@trello.com`,
        avatar: userData.avatarUrl ? `${userData.avatarUrl}/170.png` : undefined,
        username: userData.username,
        bio: userData.bio
      };

      setUser(userInfo);

      await fetchUserStats(userData.id);

    } catch (error: any) {
      console.log('Erreur lors de la récupération des données utilisateur:', error.message);
      Alert.alert('Erreur', 'Impossible de récupérer les informations utilisateur');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserStats = async (userId: string) => {
    try {
      const boards = await axios.get(
        `https://api.trello.com/1/members/me/boards?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`
      );
      
      const cards = await axios.get(
        `https://api.trello.com/1/members/me/cards?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`
      );

      const orgs = await axios.get(
        `https://api.trello.com/1/members/me/organizations?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`
      );

      setUserStats({
        boards: boards.data.length,
        cards: cards.data.length,
        workspaces: orgs.data.length
      });

    } catch (error: any) {
      console.log('Erreur lors de la récupération des statistiques:', error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Déconnexion', 
          style: 'destructive',
          onPress: () => {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              router.replace('/login');
            }, 1000);
          }
        },
      ]
    );
  };

  const menuItems = [
    {
      icon: 'person' as keyof typeof Ionicons.glyphMap,
      title: 'Informations personnelles',
      description: 'Gérer votre profil et vos informations',
      onPress: () => console.log('Informations personnelles'),
    },
    {
      icon: 'notifications' as keyof typeof Ionicons.glyphMap,
      title: 'Notifications',
      description: 'Paramètres des notifications',
      onPress: () => console.log('Notifications'),
    },
    {
      icon: 'lock-closed' as keyof typeof Ionicons.glyphMap,
      title: 'Confidentialité et sécurité',
      description: 'Gérer la confidentialité de vos données',
      onPress: () => console.log('Confidentialité'),
    },
    {
      icon: 'color-palette' as keyof typeof Ionicons.glyphMap,
      title: 'Apparence',
      description: 'Thème et apparence de l\'application',
      onPress: () => console.log('Apparence'),
    },
    {
      icon: 'help-buoy' as keyof typeof Ionicons.glyphMap,
      title: 'Aide et support',
      description: 'Centre d\'aide et support technique',
      onPress: () => console.log('Aide'),
    },
    {
      icon: 'document-text' as keyof typeof Ionicons.glyphMap,
      title: 'Conditions d\'utilisation',
      description: 'Mentions légales et CGU',
      onPress: () => console.log('Conditions'),
    },
  ];

  if (isLoading && !user) {
    return (
      <View style={styles.container}>
        <Header 
          title="Profil"
          showBack={true}
          onBack={handleBack}
        />
        <View style={styles.loadingContainer}>
          <Text>Chargement des informations...</Text>
        </View>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Header 
          title="Profil"
          showBack={true}
          onBack={handleBack}
        />
        <View style={styles.errorContainer}>
          <Text>Impossible de charger les informations utilisateur</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchUserData}>
            <Text style={styles.retryButtonText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header 
        title="Profil"
        showBack={true}
        onBack={handleBack}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {user.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </Text>
              </View>
            )}
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.userUsername}>@{user.username}</Text>

          {user.bio && (
            <Text style={styles.userBio}>{user.bio}</Text>
          )}

          <TouchableOpacity style={styles.editProfileButton}>
            <Ionicons name="pencil" size={16} color="#0052CC" />
            <Text style={styles.editProfileText}>Modifier le profil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Activité</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats.boards}</Text>
              <Text style={styles.statLabel}>Board{userStats.boards > 1 ? 's' : ''}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats.cards}</Text>
              <Text style={styles.statLabel}>Card{userStats.cards > 1 ? 's' : ''}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats.workspaces}</Text>
              <Text style={styles.statLabel}>WorkSpace{userStats.workspaces > 1 ? 's' : ''}</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Paramètres</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIcon}>
                  <Ionicons name={item.icon} size={20} color="#0052CC" />
                </View>
                <View style={styles.menuText}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuDescription}>{item.description}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#6B778C" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.accountSection}>
          <Text style={styles.sectionTitle}>Compte</Text>
          
          <TouchableOpacity style={styles.accountItem}>
            <View style={styles.accountItemLeft}>
              <Ionicons name="swap-horizontal" size={20} color="#6B778C" />
              <Text style={styles.accountItemText}>Changer de compte</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#6B778C" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.accountItem, styles.logoutItem]}
            onPress={handleLogout}
            disabled={isLoading}
          >
            <View style={styles.accountItemLeft}>
              {isLoading ? (
                <Ionicons name="refresh" size={20} color="#FF5630" />
              ) : (
                <Ionicons name="log-out" size={20} color="#FF5630" />
              )}
              <Text style={[styles.accountItemText, styles.logoutText]}>
                {isLoading ? 'Déconnexion...' : 'Se déconnecter'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.versionSection}>
          <Text style={styles.versionText}>TrellTech v1.0.0</Text>
          <Text style={styles.buildText}>Build 2025.25.10</Text>
        </View>
      </ScrollView>
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  retryButton: {
    backgroundColor: '#0052CC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  profileSection: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#0052CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0052CC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#172B4D',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#6B778C',
    marginBottom: 2,
  },
  userUsername: {
    fontSize: 14,
    color: '#0052CC',
    marginBottom: 8,
  },
  userBio: {
    fontSize: 14,
    color: '#6B778C',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 16,
    maxWidth: '80%',
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#0052CC',
    borderRadius: 20,
  },
  editProfileText: {
    color: '#0052CC',
    fontWeight: '600',
    marginLeft: 6,
  },
  statsSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#172B4D',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0052CC',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B778C',
  },
  menuSection: {
    backgroundColor: '#fff',
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    color: '#172B4D',
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 14,
    color: '#6B778C',
  },
  accountSection: {
    backgroundColor: '#fff',
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  accountItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountItemText: {
    fontSize: 16,
    color: '#172B4D',
    marginLeft: 12,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#FF5630',
  },
  versionSection: {
    padding: 24,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    color: '#6B778C',
    marginBottom: 4,
  },
  buildText: {
    fontSize: 12,
    color: '#6B778C',
  },
});