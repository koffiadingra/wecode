import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import Header from './Header';

const TRELLO_API_KEY = 'e541609eba1502b2d0ec748783a47fe4';
const TRELLO_API_TOKEN = 'ATTA069b18ffe82d1775744d944e91da68bc61992fcb52a6fb766c737e46a0c450418CF6D37F';

export default function CreateCardScreen() {
  const params = useLocalSearchParams();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleCreateCard = async () => {
    if (!title.trim()) {
      Alert.alert('Erreur', 'Veuillez saisir un titre pour la carte');
      return;
    }

    const listId = params.listId as string;
    
    if (!listId) {
      Alert.alert('Erreur', 'ID de liste manquant');
      return;
    }

    setIsCreating(true);
    
    try {
      const res = await axios.post(
        `https://api.trello.com/1/cards?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`,
        {
          name: title,
          desc: description,
          idList: listId
        }
      );

      console.log('Carte créée:', res.data);
      
      Alert.alert('Succès', `Carte "${title}" créée avec succès`, [
        { 
          text: 'OK', 
          onPress: () => {
            router.back();
          }
        }
      ]);
    } catch (error: any) {
      console.log('Erreur création carte:', error.message);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la création');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Nouvelle Carte"
        showBack={true}
        onBack={handleBack}
        rightAction={
          isCreating ? undefined : {
            icon: 'checkmark',
            onPress: handleCreateCard
          }
        }
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Titre de la carte *</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Ex: Créer les composants"
              placeholderTextColor="#6B778C"
              autoFocus
              editable={!isCreating}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Ajoutez une description plus détaillée..."
              placeholderTextColor="#6B778C"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              editable={!isCreating}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.createButton,
            (!title.trim() || isCreating) && styles.createButtonDisabled
          ]}
          onPress={handleCreateCard}
          disabled={!title.trim() || isCreating}
        >
          {isCreating ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Ionicons name="add" size={20} color="#fff" />
          )}
          <Text style={styles.createButtonText}>
            {isCreating ? 'Création...' : 'Créer la carte'}
          </Text>
        </TouchableOpacity>
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
  },
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#172B4D',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#172B4D',
  },
  textArea: {
    minHeight: 120,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0052CC',
    padding: 16,
    borderRadius: 8,
  },
  createButtonDisabled: {
    backgroundColor: '#6B778C',
    opacity: 0.6,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});