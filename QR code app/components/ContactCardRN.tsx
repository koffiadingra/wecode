import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Contact } from '../types/contact';

interface ContactCardProps {
  contact: Contact;
  onShareQR: (contact: Contact) => void;
  onShareNFC: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export function ContactCardRN({
  contact,
  onShareQR,
  onShareNFC,
  onDelete,
}: ContactCardProps) {
  const initials = `${contact.firstName[0]}${contact.lastName[0]}`.toUpperCase();

  const handleDelete = () => {
    Alert.alert(
      'Supprimer le contact',
      `Voulez-vous vraiment supprimer ${contact.firstName} ${contact.lastName} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => onDelete(contact.id || '')
        },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>
            {contact.firstName} {contact.lastName}
          </Text>
          {contact.company && (
            <Text style={styles.detail}>🏢 {contact.company}</Text>
          )}
          {contact.position && (
            <Text style={styles.detail}>💼 {contact.position}</Text>
          )}
        </View>
      </View>

      <View style={styles.details}>
        <Text style={styles.detailRow}>
          📧 {contact.email}
        </Text>
        <Text style={styles.detailRow}>
          📱 {contact.phone}
        </Text>
        {contact.website && (
          <Text style={styles.detailRow}>
            🌐 {contact.website}
          </Text>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.qrButton]}
          onPress={() => onShareQR(contact)}
        >
          <Text style={styles.actionButtonText}>📱 QR Code</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.nfcButton]}
          onPress={() => onShareNFC(contact)}
        >
          <Text style={styles.actionButtonText}>📡 NFC</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  detail: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  details: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  detailRow: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  qrButton: {
    backgroundColor: '#4F46E5',
  },
  nfcButton: {
    backgroundColor: '#10B981',
  },
  deleteButton: {
    backgroundColor: '#FEE2E2',
    flex: 0,
    paddingHorizontal: 16,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButtonText: {
    fontSize: 18,
  },
});
