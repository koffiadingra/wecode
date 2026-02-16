import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

/**
 * Upload une image vers Firebase Storage
 * @param file - Le fichier image à uploader
 * @param path - Le chemin dans Storage (ex: 'fideles/photo.jpg')
 * @returns L'URL de téléchargement de l'image
 */
export async function uploadImage(file: File, path: string): Promise<string> {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}

/**
 * Supprime une image de Firebase Storage
 * @param photoUrl - L'URL de l'image à supprimer
 */
export async function deleteImage(photoUrl: string): Promise<void> {
  try {
    const storageRef = ref(storage, photoUrl);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}

/**
 * Convertit un fichier en base64 (pour le mode démo)
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
