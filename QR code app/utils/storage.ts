import AsyncStorage from '@react-native-async-storage/async-storage';
import { Contact } from '../types/contact';

const STORAGE_KEY = '@sharecontact_contacts';

export async function saveContacts(contacts: Contact[]): Promise<void> {
  try {
    const jsonValue = JSON.stringify(contacts);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des contacts:', error);
    throw error;
  }
}


export async function loadContacts(): Promise<Contact[]> {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Erreur lors du chargement des contacts:', error);
    return [];
  }
}


export async function clearContacts(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Erreur lors de la suppression des contacts:', error);
    throw error;
  }
}
