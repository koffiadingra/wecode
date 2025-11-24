import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';

const TRELLO_API_KEY = 'e541609eba1502b2d0ec748783a47fe4';
const TRELLO_API_TOKEN = 'ATTA069b18ffe82d1775744d944e91da68bc61992fcb52a6fb766c737e46a0c450418CF6D37F';

export default function CreateBoards() {
  const router = useRouter();
  const [boardName, setBoardName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const newBoard = async () => {
    if (!boardName.trim()) { 
      Alert.alert("Le nom du tableau ne peut pas être vide."); 
      return; 
    }

    setIsCreating(true);
    try {
      const res = await axios.post(
        `https://api.trello.com/1/boards/?name=${(boardName)}&key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`
      );
      console.log(res.data);
      setBoardName('');
      Alert.alert("Succès", `Le tableau "${res.data.name}" a été créé !`);
      router.back();
    } catch (error: any) {
      console.log("Erreur lors de la création du tableau:", error.message);
      Alert.alert("Erreur", "Impossible de créer le tableau. " + (error.message));
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <View style={styles.container}>
       <Header 
        title="Workspace" 
        showBack={false}
        showProfile={true}
      />
      <Text style={styles.label}>Nom du tableau</Text>
      <TextInput
        style={styles.input}
        value={boardName} 
        onChangeText={setBoardName} 
        placeholder="Entrez le nom du tableau"
        placeholderTextColor="#8E8E93"
        editable={!isCreating}
      />

      <Button 
        title={isCreating ? "Créer un nouveau tableau" :"Créer un nouveau tableau"}
        onPress={newBoard} 
        disabled={isCreating}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    color: '#6b778c',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#dfe1e6',
    borderRadius: 8,
    padding: 15,
    fontSize: 18,
    color: '#172b4d',
    backgroundColor: '#edf1f5ff',
    marginBottom: 30,
  },
});