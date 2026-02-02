import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Contact } from '../types/contact';
import { createSecureVCard } from '../utils/security';

interface QRCodeDisplayProps {
  contact: Contact;
  onClose: () => void;
}

const { width } = Dimensions.get('window');
const QR_SIZE = Math.min(width * 0.7, 300);

export function QRCodeDisplayRN({ contact, onClose }: QRCodeDisplayProps) {
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
    return (
      <View style={styles.container}>
        <Text style={styles.errorTitle}>❌ Erreur</Text>
        <Text style={styles.errorText}>
          Impossible de générer le QR Code
        </Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Fermer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>QR Code</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <Text style={styles.contactName}>
          {contact.firstName} {contact.lastName}
        </Text>
        {contact.company && (
          <Text style={styles.contactDetail}>{contact.company}</Text>
        )}
      </View>

      <View style={styles.qrContainer}>
        <QRCode value={vCard} size={QR_SIZE} backgroundColor="white" />
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionsTitle}>📱 Comment scanner ?</Text>
        <Text style={styles.instructionsText}>
          1. Ouvrez l'appareil photo de votre téléphone{'\n'}
          2. Pointez vers le QR Code{'\n'}
          3. Appuyez sur la notification pour ajouter le contact
        </Text>
      </View>

      <View style={styles.securityBadge}>
        <Text style={styles.securityText}>🔒 Partage sécurisé</Text>
      </View>

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Fermer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  closeIcon: {
    fontSize: 24,
    color: '#6B7280',
  },
  info: {
    alignItems: 'center',
    marginBottom: 24,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  contactDetail: {
    fontSize: 14,
    color: '#6B7280',
  },
  qrContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginBottom: 24,
  },
  instructions: {
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  instructionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4F46E5',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 20,
  },
  securityBadge: {
    alignItems: 'center',
    marginBottom: 16,
  },
  securityText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  errorTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  closeButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
