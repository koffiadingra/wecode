import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, Modal, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import Header from './Header';

const TRELLO_API_KEY = 'e541609eba1502b2d0ec748783a47fe4';
const TRELLO_API_TOKEN = 'ATTA069b18ffe82d1775744d944e91da68bc61992fcb52a6fb766c737e46a0c450418CF6D37F';

export default function CardDetailScreen() {
  const params = useLocalSearchParams();
  
  const [card, setCard] = useState<any>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [boardMembers, setBoardMembers] = useState<any[]>([]);
  const [availableLists, setAvailableLists] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [cardMembers, setCardMembers] = useState<any[]>([]);

  useEffect(() => {
    const cardData = JSON.parse(params.cardData as string);
    const boardId = params.boardId as string;
    
    setCard(cardData);
    setTitle(cardData.name || cardData.title);
    setDescription(cardData.desc || cardData.description || '');
    
    fetchCardDetails(cardData.id);
    fetchBoardMembers(boardId);
    fetchBoardLists(boardId);
  }, [params.cardData, params.boardId]);

  const fetchCardDetails = async (cardId: string) => {
    try {
      const res = await axios.get(
        `https://api.trello.com/1/cards/${cardId}?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}&members=true`
      );
      
      const cardDetails = res.data;
      console.log("Détails de la carte:", cardDetails);
      
      setCard(cardDetails);
      
      if (cardDetails.members && cardDetails.members.length > 0) {
        setCardMembers(cardDetails.members);
      } else {
        setCardMembers([]);
      }
    } catch (error: any) {
      console.log('Erreur récupération détails carte:', error.message);
    }
  };

  const fetchBoardMembers = async (boardId: string) => {
    try {
      const res = await axios.get(
        `https://api.trello.com/1/boards/${boardId}/members?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`
      );
      setBoardMembers(res.data);
    } catch (error: any) {
      console.log('Erreur recuperation membres:', error.message);
      setBoardMembers([]);
    }
  };

  const fetchBoardLists = async (boardId: string) => {
    try {
      const res = await axios.get(
        `https://api.trello.com/1/boards/${boardId}/lists?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`
      );
      const listsWithCardCount = await Promise.all(
        res.data.map(async (list: any) => {
          const cardsRes = await axios.get(
            `https://api.trello.com/1/lists/${list.id}/cards?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`
          );
          return {
            ...list,
            cards: cardsRes.data
          };
        })
      );
      setAvailableLists(listsWithCardCount);
    } catch (error: any) {
      console.log('Erreur recuperation listes:', error.message);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const saveTitle = async () => {
    setLoading(true);
    try {
      await axios.put(
        `https://api.trello.com/1/cards/${card.id}?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`,
        { name: title }
      );
      setCard({ ...card, name: title, title });
      setIsEditingTitle(false);
      Alert.alert('Succès', 'Titre mis à jour');
    } catch (error: any) {
      Alert.alert('Erreur', 'Impossible de mettre à jour le titre');
    } finally {
      setLoading(false);
    }
  };

  const saveDescription = async () => {
    setLoading(true);
    try {
      await axios.put(
        `https://api.trello.com/1/cards/${card.id}?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`,
        { desc: description }
      );
      setCard({ ...card, desc: description, description });
      setIsEditingDescription(false);
      Alert.alert('Succès', 'Description mise à jour');
    } catch (error: any) {
      Alert.alert('Erreur', 'Impossible de mettre à jour la description');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCard = () => {
    Alert.alert(
      'Supprimer la carte',
      'Êtes-vous sûr de vouloir supprimer cette carte ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Supprimer', 
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              await axios.delete(
                `https://api.trello.com/1/cards/${card.id}?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`
              );
              Alert.alert('Succès', 'Carte supprimée', [
                { text: 'OK', onPress: () => router.back() }
              ]);
            } catch (error: any) {
              Alert.alert('Erreur', 'Impossible de supprimer la carte');
            } finally {
              setLoading(false);
            }
          }
        },
      ]
    );
  };

  const handleMoveCard = async (newListId: string) => {
    setLoading(true);
    try {
      await axios.put(
        `https://api.trello.com/1/cards/${card.id}?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`,
        { idList: newListId }
      );
      setShowMoveModal(false);
      Alert.alert('Succès', 'Carte déplacée');
    } catch (error: any) {
      Alert.alert('Erreur', 'Impossible de déplacer la carte');
    } finally {
      setLoading(false);
    }
  };

  const handleAssignMember = async (member: any) => {
    if (cardMembers.some((m: any) => m.id === member.id)) {
      Alert.alert('Info', 'Ce membre est déjà assigné');
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `https://api.trello.com/1/cards/${card.id}/idMembers?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`,
        { value: member.id }
      );
      
      const updatedMembers = [...cardMembers, member];
      setCardMembers(updatedMembers);
      setCard({ ...card, members: updatedMembers });
      
      setShowMembersModal(false);
      Alert.alert('Succès', 'Membre assigné');
    } catch (error: any) {
      Alert.alert('Erreur', 'Impossible d\'assigner le membre');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    setLoading(true);
    try {
      await axios.delete(
        `https://api.trello.com/1/cards/${card.id}/idMembers/${memberId}?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`
      );
      
      const updatedMembers = cardMembers.filter((m: any) => m.id !== memberId);
      setCardMembers(updatedMembers);
      setCard({ ...card, members: updatedMembers });
      
      Alert.alert('Succès', 'Membre retiré');
    } catch (error: any) {
      Alert.alert('Erreur', 'Impossible de retirer le membre');
    } finally {
      setLoading(false);
    }
  };

  if (!card) {
    return (
      <View style={styles.container}>
        <Header title="Détails de la carte" showBack={true} onBack={handleBack} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0052CC" />
        </View>
      </View>
    );
  }

  const assignees = cardMembers;

  return (
    <View style={styles.container}>
      <Header 
        title="Détails de la carte"
        showBack={true}
        onBack={handleBack}
        rightAction={{
          icon: 'trash-outline',
          onPress: handleDeleteCard
        }}
      />

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0052CC" />
        </View>
      )}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          {isEditingTitle ? (
            <View>
              <TextInput
                style={styles.titleInput}
                value={title}
                onChangeText={setTitle}
                multiline
                autoFocus
              />
              <View style={styles.editActions}>
                <TouchableOpacity style={styles.saveButton} onPress={saveTitle}>
                  <Text style={styles.saveButtonText}>Sauvegarder</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.cancelButton} 
                  onPress={() => {
                    setIsEditingTitle(false);
                    setTitle(card.name || card.title);
                  }}
                >
                  <Text style={styles.cancelButtonText}>Annuler</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.titleSection}
              onPress={() => setIsEditingTitle(true)}
            >
              <Text style={styles.cardTitle}>{card.name || card.title}</Text>
              <Ionicons name="pencil" size={16} color="#6B778C" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="document-text" size={20} color="#172B4D" />
            <Text style={styles.sectionTitle}>Description</Text>
          </View>
          
          {isEditingDescription ? (
            <View>
              <TextInput
                style={styles.descriptionInput}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                autoFocus
              />
              <View style={styles.editActions}>
                <TouchableOpacity style={styles.saveButton} onPress={saveDescription}>
                  <Text style={styles.saveButtonText}>Sauvegarder</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.cancelButton} 
                  onPress={() => {
                    setIsEditingDescription(false);
                    setDescription(card.desc || card.description || '');
                  }}
                >
                  <Text style={styles.cancelButtonText}>Annuler</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.descriptionSection}
              onPress={() => setIsEditingDescription(true)}
            >
              {card.desc || card.description ? (
                <Text style={styles.descriptionText}>{card.desc || card.description}</Text>
              ) : (
                <Text style={styles.placeholderText}>Ajouter une description plus détaillée...</Text>
              )}
              <Ionicons name="pencil" size={16} color="#6B778C" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="people" size={20} color="#172B4D" />
            <Text style={styles.sectionTitle}>Membres assignés</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowMembersModal(true)}
            >
              <Ionicons name="add" size={20} color="#0052CC" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.assigneesContainer}>
            {assignees.map((assignee: any) => (
              <View key={assignee.id} style={styles.assignee}>
                <View style={styles.assigneeAvatar}>
                  <Text style={styles.assigneeInitial}>
                    {assignee.fullName?.charAt(0).toUpperCase() || 
                     assignee.username?.charAt(0).toUpperCase() || 'U'}
                  </Text>
                </View>
                <Text style={styles.assigneeName}>
                  {assignee.fullName || assignee.username || 'Membre inconnu'}
                </Text>
                <TouchableOpacity 
                  style={styles.removeAssignee}
                  onPress={() => handleRemoveMember(assignee.id)}
                >
                  <Ionicons name="close" size={16} color="#FF5630" />
                </TouchableOpacity>
              </View>
            ))}
            
            {assignees.length === 0 && (
              <Text style={styles.noAssigneesText}>Aucun membre assigné</Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="options" size={20} color="#172B4D" />
            <Text style={styles.sectionTitle}>Actions</Text>
          </View>
          
          <View style={styles.actionsGrid}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => setShowMoveModal(true)}
            >
              <Ionicons name="swap-horizontal" size={20} color="#6B778C" />
              <Text style={styles.actionText}>Déplacer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="calendar" size={20} color="#6B778C" />
              <Text style={styles.actionText}>Date déchéance</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="flag" size={20} color="#6B778C" />
              <Text style={styles.actionText}>Labels</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="checkmark-circle" size={20} color="#6B778C" />
              <Text style={styles.actionText}>Checklist</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={showMembersModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Assigner un membre</Text>
            <TouchableOpacity onPress={() => setShowMembersModal(false)}>
              <Ionicons name="close" size={24} color="#172B4D" />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={boardMembers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.memberItem}
                onPress={() => handleAssignMember(item)}
              >
                <View style={styles.memberAvatar}>
                  <Text style={styles.memberInitial}>
                    {item.fullName?.charAt(0).toUpperCase() || 
                     item.username?.charAt(0).toUpperCase() || 'U'}
                  </Text>
                </View>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{item.fullName || item.username}</Text>
                  <Text style={styles.memberUsername}>@{item.username}</Text>
                </View>
                {cardMembers.some((m: any) => m.id === item.id) && (
                  <Ionicons name="checkmark" size={20} color="#0052CC" />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      <Modal
        visible={showMoveModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Déplacer la carte</Text>
            <TouchableOpacity onPress={() => setShowMoveModal(false)}>
              <Ionicons name="close" size={24} color="#172B4D" />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={availableLists}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.listItem}
                onPress={() => handleMoveCard(item.id)}
              >
                <Ionicons name="list" size={20} color="#0052CC" />
                <Text style={styles.listName}>{item.name}</Text>
                <Text style={styles.listCardCount}>({item.cards?.length || 0} cartes)</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
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
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 8,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#172B4D',
    marginLeft: 8,
    flex: 1,
  },
  addButton: {
    padding: 4,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#172B4D',
    flex: 1,
    marginRight: 12,
  },
  titleInput: {
    fontSize: 20,
    fontWeight: '600',
    color: '#172B4D',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#0052CC',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  descriptionSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  descriptionText: {
    fontSize: 14,
    color: '#172B4D',
    lineHeight: 20,
    flex: 1,
    marginRight: 12,
  },
  placeholderText: {
    fontSize: 14,
    color: '#6B778C',
    fontStyle: 'italic',
    flex: 1,
    marginRight: 12,
  },
  descriptionInput: {
    fontSize: 14,
    color: '#172B4D',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#0052CC',
    borderRadius: 4,
    padding: 8,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 8,
  },
  editActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#0052CC',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cancelButtonText: {
    color: '#6B778C',
  },
  assigneesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  assignee: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f7ff',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#0052CC',
  },
  assigneeAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0052CC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  assigneeInitial: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 10,
  },
  assigneeName: {
    color: '#0052CC',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },
  removeAssignee: {
    padding: 2,
  },
  noAssigneesText: {
    color: '#6B778C',
    fontStyle: 'italic',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
  },
  actionText: {
    color: '#6B778C',
    marginLeft: 8,
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#172B4D',
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0052CC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  memberInitial: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#172B4D',
  },
  memberUsername: {
    fontSize: 14,
    color: '#6B778C',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  listName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#172B4D',
    marginLeft: 12,
    flex: 1,
  },
  listCardCount: {
    fontSize: 14,
    color: '#6B778C',
  },
});