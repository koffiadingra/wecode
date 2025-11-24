import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import axios from 'axios';
import Header from '@/components/Header';

const TRELLO_API_KEY = 'e541609eba1502b2d0ec748783a47fe4';
const TRELLO_API_TOKEN = 'ATTA069b18ffe82d1775744d944e91da68bc61992fcb52a6fb766c737e46a0c450418CF6D37F';

export default function Workspace() {
  const router = useRouter();
  const [boards, setBoards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingBoardId, setDeletingBoardId] = useState<string | null>(null);

  const fetchMyWorkspace = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://api.trello.com/1/organizations/66c3145007580aa91cf9324d?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`);
      console.log("Workspace récupéré:", res.data);
      setBoards(res.data);
    } catch (error: any) {
      console.log("Erreur lors de la récupération du workspace :", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBoardPress = (boardId: string, boardName: string) => {
    console.log(`Navigation vers les listes du board: ${boardName}`);
    router.push({
      pathname: '/liste',
      params: { 
        boardId: boardId,
        boardName: boardName 
      }
    });
  };

  const deleteTrelloBoard = async (boardId: string, boardName: string) => {
    setDeletingBoardId(boardId); 
    try {
      const res = await axios.delete(`https://api.trello.com/1/boards/${boardId}?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`);
      console.log("Tableau supprimé :", res.data);
      Alert.alert("Succès", `Le tableau "${boardName}" a été supprimé !`);
      fetchMyWorkspace();
    } catch (error: any) {
      console.log(`Erreur lors de la suppression du tableau ${boardName}:`, error.message);
      Alert.alert("Erreur", `Impossible de supprimer le tableau "${boardName}". Veuillez vérifier vos permissions Trello ou réessayer.`);
    } finally {
      setDeletingBoardId(null); 
    }
  };

  useEffect(() => {
    fetchMyWorkspace();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchMyWorkspace();
    }, [])
  );

  const BoardItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.boardCard}
      onPress={() => {
        handleBoardPress(item.id, item.name);
      }}
    >
      <View style={styles.boardContent}>
        <Text style={styles.boardCardText}>{item.name}</Text>
        <TouchableOpacity
          style={[styles.deleteButton, deletingBoardId === item.id && styles.deleteButtonDisabled]}
          onPress={(e) => {
            e.stopPropagation();
            Alert.alert(
              "Supprimer le tableau",
              `Êtes-vous sûr de vouloir supprimer "${item.name}" ?`,
              [
                { text: "Annuler", style: "cancel" },
                { 
                  text: "Supprimer", 
                  style: "destructive",
                  onPress: () => deleteTrelloBoard(item.id, item.name)
                }
              ]
            );
          }}
          disabled={deletingBoardId === item.id}
        >
          {deletingBoardId === item.id ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.deleteButtonText}>×</Text>
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Workspace" 
        showBack={false}
        showProfile={true}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0052CC" />
        </View>
      ) : (
        <FlatList
          data={boards}
          keyExtractor={(item) => item.id}
          renderItem={BoardItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyListText}>Aucun tableau trouvé</Text>
              <Text style={styles.emptyListSubText}>Créez votre premier tableau !</Text>
            </View>
          }
        />
      )}

      <TouchableOpacity
        style={styles.createBoardButton}
        onPress={() => router.push('./createboards')}
      >
        <Text style={styles.createBoardButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
    paddingTop: 16,
  },
  boardCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#0052CC',
  },
  boardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boardCardText: {
    color: '#172B4D',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyListText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#172B4D',
    marginBottom: 8,
  },
  emptyListSubText: {
    fontSize: 14,
    color: '#6B778C',
    textAlign: 'center',
  },
  createBoardButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0052CC',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  createBoardButtonText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '300',
  },
  deleteButton: {
    backgroundColor: '#FF5630',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  deleteButtonDisabled: {
    backgroundColor: '#6B778C',
    opacity: 0.6,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});