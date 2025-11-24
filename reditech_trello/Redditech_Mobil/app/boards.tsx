import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRouter,useFocusEffect} from 'expo-router';
import axios from 'axios';
import Header from '../components/Header';


const TRELLO_API_KEY = 'e541609eba1502b2d0ec748783a47fe4';
const TRELLO_API_TOKEN = 'ATTA069b18ffe82d1775744d944e91da68bc61992fcb52a6fb766c737e46a0c450418CF6D37F'; // <-- RE


export default function Boards() {
  const router = useRouter();
  const [boards, setBoards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingBoardId, setDeletBoarById] = useState<string | null>(null);
// recupérer les tableaux 
  const fetchMyBoards = async () => {
    setLoading(true);
    try {
      const res=  await axios.get(`https://api.trello.com/1/members/me/boards?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`);
      console.log("Tableaux récupérés:", res.data);
      setBoards(res.data);
    } catch (error: any) {
      console.log("Erreur lors de la récupération des tableaux :", error.message);
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

  // fonction pour supprimer un tableau
  const deleteTrelloBoard = async (boardId: string, boardName: string) => {
    setDeletBoarById(boardId); 
    try {
      const res = await axios.delete (`https://api.trello.com/1/boards/${boardId}?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`);
      console.log("Tableau supprimé :", res.data);
      Alert.alert("Succès", `Le tableau "${boardName}" a été supprimé !`);
      fetchMyBoards();
    } catch (error: any) {
      console.log(`Erreur lors de la suppression du tableau ${boardName}:`, error.message);
      Alert.alert("Erreur", `Impossible de supprimer le tableau "${boardName}". Veuillez vérifier vos permissions Trello ou réessayer.`);
    } finally {
      setDeletBoarById(null); 
    }
  };


  useEffect(() => {
    fetchMyBoards();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchMyBoards();
    }, [])
  );

  // les boards ave boutons de suppression
  const BoardItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.boardCard,
        { backgroundColor: '#0079bf' }
      ]}
      onPress={() => {
        handleBoardPress(item.id, item.name);
      }}
    >
      <Text style={styles.boardCardText}>{item.name}</Text>
      {/* Bouton de suppression */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={(e) => {
          e.stopPropagation();
          deleteTrelloBoard(item.id, item.name);
        }}
        disabled={deletingBoardId === item.id}
      >
        {deletingBoardId === item.id ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text style={styles.deleteButtonText}>X</Text>
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Mes Tableaux" 
        showBack={false}
        showProfile={true}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0079bf" style={styles.loadingIndicator} />
      ) : (
        <FlatList
          data={boards}
          keyExtractor={(item) => item.id}
          renderItem={BoardItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyListText}>Aucun tableau trouvé. Crée-en un !</Text>
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
    backgroundColor: '#ebecf0',
    paddingTop: 0,
  },
  loadingIndicator: {
    marginTop: 50,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 80,
    paddingTop: 10,
  },
  boardCard: {
    padding: 20,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
    minHeight: 100,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  boardCardText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#6b778c',
  },
  createBoardButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0079bf',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  createBoardButtonText: {
    color: 'white',
    fontSize: 36,
    lineHeight: 38,
  },
  deleteButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});