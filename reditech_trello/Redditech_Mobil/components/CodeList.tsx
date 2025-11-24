import { FlatList, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from "react-native";
import React, { useEffect, useState } from 'react';
import AddList from "./AddList";
import Archive from "./ArchList";
import { router, useLocalSearchParams } from "expo-router";
import Card from "./Card";

export default function Liste() {
  const params = useLocalSearchParams();
  const boardId = params.boardId as string;
  const boardName = params.boardName as string;

  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cards, setCards] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const API_KEY = "e541609eba1502b2d0ec748783a47fe4";
  const TOKEN = "ATTA069b18ffe82d1775744d944e91da68bc61992fcb52a6fb766c737e46a0c450418CF6D37F";

  const fetchAllData = async () => {
    if (!boardId) return;

    try {
      const res = await fetch(`https://api.trello.com/1/boards/${boardId}/lists?key=${API_KEY}&token=${TOKEN}`)
      if (res.ok) {
        const data = await res.json();
        setLists(data);
        console.log("Listes récupérées:", data);
        
        setCards({});
        
        data.forEach(list => fetchCardsForList(list.id));
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [boardId]);

  const fetchCardsForList = async (listId: string) => {
    try {
      const res = await fetch(`https://api.trello.com/1/lists/${listId}/cards?key=${API_KEY}&token=${TOKEN}`);
      if (res.ok) {
        const cardsData = await res.json();
        
        setCards(prev => ({
          ...prev,
          [listId]: cardsData
        }));
      }
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchAllData();
  };

  const refreshData = () => {
    fetchAllData();
  };

  const handleCardPress = (card: any, listId: string) => {
    router.push({
      pathname: '/card-detail',
      params: { 
        cardData: JSON.stringify(card),
        boardId: boardId
      }
    });
  };

  const handleAddCard = (listId: string) => {
    router.push({
      pathname: '/create-card',
      params: { listId, boardId, refreshKey: Date.now() }
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Chargement...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Erreur: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{boardName || "Mon Trello"}</Text>
      <FlatList
        data={lists}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#ffffff']}
            tintColor="#ffffff"
          />
        }
        renderItem={({ item }) => (
          <View style={styles.list}>
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>{item.name}</Text>
              <Archive listId={item.id} onArchive={refreshData} />
            </View>
            
            <FlatList
              data={cards[item.id] || []}
              keyExtractor={(card) => card.id}
              renderItem={({ item: card }) => (
                <Card 
                  card={card} 
                  onPress={() => handleCardPress(card, item.id)}
                />
              )}
              style={styles.cardsContainer}
              showsVerticalScrollIndicator={false}
            />
            
            <TouchableOpacity 
              style={styles.addCardButton}
              onPress={() => handleAddCard(item.id)}
            >
              <Text style={styles.addCardText}>+ Ajouter une carte</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={<AddList onListAdded={refreshData} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'pink', 
    paddingTop: 50 
  },
  header: { 
    color: 'white', 
    fontSize: 28, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20 
  },
  list: { 
    backgroundColor: '#00000066', 
    marginHorizontal: 5, 
    padding: 15, 
    borderRadius: 8, 
    width: 280,
    maxHeight: 500,
  },
  listHeader: {
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  listTitle: { 
    color: "white",
    fontWeight: 'bold', 
    fontSize: 16, 
    flex: 1,
  },
  cardsContainer: {
    flex: 1,
    marginBottom: 10,
  },
  addCardButton: {
    backgroundColor: '#00000033',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addCardText: {
    color: 'white',
    fontSize: 14,
  },
});