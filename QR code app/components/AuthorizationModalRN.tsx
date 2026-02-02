import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import { Contact } from '../types/contact';
import { secureNFC } from '../utils/nfcSecurity';
import { createSecureVCard } from '../utils/security';
import * as Haptics from 'expo-haptics';

interface AuthorizationModalProps {
  visible: boolean;
  contact: Contact | null;
  type: 'qr' | 'nfc';
  onConfirm: () => void;
  onCancel: () => void;
}

export function AuthorizationModalRN({
  visible,
  contact,
  type,
  onConfirm,
  onCancel,
}: AuthorizationModalProps) {
  const [isWriting, setIsWriting] = useState(false);

  if (!contact) return null;

  const methodText = type === 'qr' ? 'QR Code' : 'NFC';
  const methodIcon = type === 'qr' ? '📱' : '📡';

  const handleConfirm = async () => {
    if (type === 'nfc') {
      // Pour NFC
      setIsWriting(true);
      
      const vCard = createSecureVCard({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        company: contact.company,
        position: contact.position,
        website: contact.website,
      });

      if (!vCard) {
        Alert.alert('Erreur', 'Impossible de créer la vCard');
        setIsWriting(false);
        return;
      }

      const result = await secureNFC.writeSecure(vCard);
      setIsWriting(false);

      if (result.success) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Alert.alert('Succès', 'Contact écrit sur la puce NFC');
        onCancel();
      } else {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert('Erreur NFC', result.error || 'Erreur inconnue');
      }
    } else {
      onConfirm();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.icon}>{methodIcon}</Text>
            <Text style={styles.title}>Autorisation de partage</Text>
          </View>

          <View style={styles.warning}>
            <Text style={styles.warningIcon}>⚠️attention</Text>
            <Text style={styles.warningText}>
              Vous allez partager vos informations personnelles
            </Text>
          </View>

          <View style={styles.contactInfo}>
            <Text style={styles.sectionTitle}>Contact à partager :</Text>
            <View style={styles.infoBox}>
              <Text style={styles.contactName}>
                {contact.firstName} {contact.lastName}
              </Text>
              <Text style={styles.contactDetail}>📧 {contact.email}</Text>
              <Text style={styles.contactDetail}>📱 {contact.phone}</Text>
              {contact.company && (
                <Text style={styles.contactDetail}>🏢 {contact.company}</Text>
              )}
              {contact.position && (
                <Text style={styles.contactDetail}>💼 {contact.position}</Text>
              )}
              {contact.website && (
                <Text style={styles.contactDetail}>🌐 {contact.website}</Text>
              )}
            </View>
          </View>

          <View style={styles.methodInfo}>
            <Text style={styles.sectionTitle}>Méthode de partage :</Text>
            <View style={styles.methodBox}>
              <Text style={styles.methodText}>
                {methodIcon} {methodText}
              </Text>
            </View>
          </View>

          <View style={styles.securityBadge}>
            <Text style={styles.securityText}>🔒 Partage sécurisé et chiffré</Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.denyButton]}
              onPress={onCancel}
              disabled={isWriting}
            >
              <Text style={styles.denyButtonText}>✕ Refuser</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.authorizeButton]}
              onPress={handleConfirm}
              disabled={isWriting}
            >
              <Text style={styles.authorizeButtonText}>
                {isWriting ? '⏳ Écriture...' : '✓ Autoriser'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  warning: {
    flexDirection: 'row',
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  warningIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: '#92400E',
    fontWeight: '500',
  },
  contactInfo: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  infoBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  contactDetail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  methodInfo: {
    marginBottom: 16,
  },
  methodBox: {
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    alignItems: 'center',
  },
  methodText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F46E5',
  },
  securityBadge: {
    alignItems: 'center',
    marginBottom: 20,
  },
  securityText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  denyButton: {
    backgroundColor: '#FEE2E2',
  },
  denyButtonText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '600',
  },
  authorizeButton: {
    backgroundColor: '#10B981',
  },
  authorizeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
