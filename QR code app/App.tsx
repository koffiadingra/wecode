import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Contact } from './types/contact';
import { ContactFormRN } from './components/ContactFormRN';
import { ContactCardRN } from './components/ContactCardRN';
import { QRCodeDisplayRN } from './components/QRCodeDisplayRN';
import { AuthorizationModalRN } from './components/AuthorizationModalRN';
import { SecurityStatusRN } from './components/SecurityStatusRN';
import { loadContacts, saveContacts } from './utils/storage';
import * as Haptics from 'expo-haptics';

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [authModal, setAuthModal] = useState<{
    show: boolean;
    contact: Contact | null;
    type: 'qr' | 'nfc';
  }>({
    show: false,
    contact: null,
    type: 'qr',
  });

  useEffect(() => {
    loadInitialContacts();
  }, []);

  const loadInitialContacts = async () => {
    const loadedContacts = await loadContacts();
    setContacts(loadedContacts);
  };

  useEffect(() => {
    if (contacts.length > 0) {
      saveContacts(contacts);
    }
  }, [contacts]);

  const handleAddContact = (contact: Contact) => {
    setContacts([...contacts, contact]);
    setShowForm(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter((c) => c.id !== id));
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  };

  const handleShareQR = (contact: Contact) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setAuthModal({ show: true, contact, type: 'qr' });
  };

  const handleShareNFC = (contact: Contact) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setAuthModal({ show: true, contact, type: 'nfc' });
  };

  const handleAuthConfirm = () => {
    if (authModal.contact) {
      if (authModal.type === 'qr') {
        setSelectedContact(authModal.contact);
        setShowQRCode(true);
      }
    }
    setAuthModal({ show: false, contact: null, type: 'qr' });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleAuthCancel = () => {
    setAuthModal({ show: false, contact: null, type: 'qr' });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.header}>
        <Text style={styles.title}>📇 ShareContact</Text>
        <Text style={styles.subtitle}>Partage sécurisé de contacts</Text>
      </View>

      <SecurityStatusRN />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {!showForm && !showQRCode && (
          <>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                setShowForm(true);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }}
            >
              <Text style={styles.addButtonText}>+ Ajouter un contact</Text>
            </TouchableOpacity>

            {contacts.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateIcon}>📱</Text>
                <Text style={styles.emptyStateText}>Aucun contact</Text>
                <Text style={styles.emptyStateSubtext}>
                  Appuyez sur "Ajouter" pour créer votre premier contact
                </Text>
              </View>
            ) : (
              <View style={styles.contactsList}>
                {contacts.map((contact) => (
                  <ContactCardRN
                    key={contact.id}
                    contact={contact}
                    onDelete={handleDeleteContact}
                    onShareQR={handleShareQR}
                    onShareNFC={handleShareNFC}
                  />
                ))}
              </View>
            )}
          </>
        )}

        {showForm && (
          <View style={styles.formContainer}>
            <ContactFormRN
              onSubmit={handleAddContact}
              onCancel={() => {
                setShowForm(false);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            />
          </View>
        )}

        {showQRCode && selectedContact && (
          <View style={styles.qrContainer}>
            <QRCodeDisplayRN
              contact={selectedContact}
              onClose={() => {
                setShowQRCode(false);
                setSelectedContact(null);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            />
          </View>
        )}
      </ScrollView>

      <AuthorizationModalRN
        visible={authModal.show}
        contact={authModal.contact}
        type={authModal.type}
        onConfirm={handleAuthConfirm}
        onCancel={handleAuthCancel}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  contactsList: {
    gap: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  qrContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
