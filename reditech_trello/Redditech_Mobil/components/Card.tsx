import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CardProps {
  card: {
    id: string;
    name: string; 
    desc?: string;
    idMembers?: string[];
    due?: string;
    dueComplete?: boolean;
    title?: string; 
    description?: string; 
  };
  onPress: () => void;
}

export default function Card({ card, onPress }: CardProps) {
  const cardTitle = card.name || card.title || 'Sans titre';
  
  const cardDescription = card.desc || card.description;

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
    >
      <Text style={styles.title}>{cardTitle}</Text>
      
      {cardDescription && (
        <Text style={styles.description} numberOfLines={2}>
          {cardDescription}
        </Text>
      )}

      
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#172B4D',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#6B778C',
    marginBottom: 8,
    lineHeight: 16,
  },
  debugText: {
    fontSize: 10,
    color: '#999',
    fontStyle: 'italic',
  },
});