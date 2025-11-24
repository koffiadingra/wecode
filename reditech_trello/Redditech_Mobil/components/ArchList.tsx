import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, Alert } from "react-native";

interface ArchiveProps {
  listId: string;
  onArchive?: () => void;
}

export default function Archive({ listId, onArchive }: ArchiveProps) {
  const API_KEY = "e541609eba1502b2d0ec748783a47fe4";
  const TOKEN = "ATTA069b18ffe82d1775744d944e91da68bc61992fcb52a6fb766c737e46a0c450418CF6D37F";

  const archiveLists = async () => {
    try {
      const res = await fetch(
        `https://api.trello.com/1/lists/${listId}/closed?value=true&key=${API_KEY}&token=${TOKEN}`,
        {
          method: "PUT"
        }
      );

      if (res.ok) {
        Alert.alert("Succès", "Liste archivée avec succès");
        
        if (onArchive) {
          setTimeout(() => {
            onArchive();
          }, 500);
        }
      } else {
        throw new Error("Erreur d'archivage");
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert("Erreur", "Impossible d'archiver la liste");
    }
  }

  return (
    <TouchableOpacity onPress={archiveLists}>
      <Ionicons name="archive" size={16} color="white" />
    </TouchableOpacity>
  );
}