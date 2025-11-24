import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

interface AddListProps {
  onListAdded?: () => void;
}

export default function NewButton({ onListAdded }: AddListProps) {
  const params = useLocalSearchParams();
  const boardId = params.boardId as string;
  
  const [listName, setListName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddClick = () => {
    setShowForm(!showForm);
  };

  const API_KEY = "e541609eba1502b2d0ec748783a47fe4";
  const TOKEN = "ATTA069b18ffe82d1775744d944e91da68bc61992fcb52a6fb766c737e46a0c450418CF6D37F";

  const createLists = async () => {
    if (!listName) {
      Alert.alert("Erreur", "Veuillez saisir un nom pour la liste");
      return;
    }

    if (!boardId) {
      Alert.alert("Erreur", "ID du board manquant");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(
        `https://api.trello.com/1/boards/${boardId}/lists?key=${API_KEY}&token=${TOKEN}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: listName }),
        }
      );

      if (res.ok) {
        Alert.alert("Succès", "Liste ajoutée avec succès");
        setListName("");
        setShowForm(false);
        
        if (onListAdded) {
          onListAdded();
        }
      } else {
        throw new Error("Erreur lors de l'ajout");
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert("Erreur", "Impossible de créer la liste");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, isLoading && styles.buttonDisabled]} 
        onPress={handleAddClick}
        disabled={isLoading}
      >
        <Text style={styles.text}>
          {isLoading ? "Création..." : "+ Ajouter une liste"}
        </Text>
      </TouchableOpacity>
      {
        showForm && (
          <View style={styles.formContainer}>
            <TextInput 
              style={styles.input} 
              placeholder="Entrez un titre" 
              value={listName} 
              onChangeText={setListName} 
              editable={!isLoading}
              placeholderTextColor="#6B778C"
            />
            <TouchableOpacity 
              style={[styles.submitButton, isLoading && styles.submitButtonDisabled]} 
              onPress={createLists}
              disabled={isLoading}
            >
              <Text style={styles.submitText}>
                {isLoading ? "..." : "Ajouter"}
              </Text>
            </TouchableOpacity>
          </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  button: { 
    backgroundColor: "#ebecf0", 
    borderRadius: 8, 
    padding: 15, 
    width: 200, 
    justifyContent: "center", 
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  text: { 
    color: "#6B778C", 
    fontWeight: "600", 
    fontSize: 16 
  },
  formContainer: { 
    width: 200, 
    marginTop: 10 
  },
  input: { 
    backgroundColor: "#fff", 
    borderRadius: 6, 
    padding: 12, 
    marginBottom: 10, 
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 14,
    color: '#172B4D',
  },
  submitButton: { 
    backgroundColor: "#00000066", 
    borderRadius: 6, 
    padding: 12, 
    alignItems: "center" 
  },
  submitButtonDisabled: {
    backgroundColor: "#6B778C",
  },
  submitText: { 
    color: "#fff", 
    fontWeight: "600",
    fontSize: 14,
  },
});