# 🔥 Guide de Configuration Firebase pour Chapelle Pleine de Gloire

Ce guide vous explique comment configurer Firebase pour faire fonctionner l'application de gestion d'église.

## 📋 Table des matières

1. [Création du projet Firebase](#1-création-du-projet-firebase)
2. [Configuration de Firebase Authentication](#2-configuration-de-firebase-authentication)
3. [Configuration de Firestore Database](#3-configuration-de-firestore-database)
4. [Configuration de Firebase Storage](#4-configuration-de-firebase-storage)
5. [Configuration des clés dans l'application](#5-configuration-des-clés-dans-lapplication)
6. [Structure des données](#6-structure-des-données)
7. [Règles de sécurité](#7-règles-de-sécurité)

---

## 1. Création du projet Firebase

### Étape 1.1 : Créer un nouveau projet

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquez sur **"Ajouter un projet"**
3. Nommez votre projet : `chapelle-pleine-de-gloire` (ou votre nom préféré)
4. Désactivez Google Analytics (optionnel pour ce projet)
5. Cliquez sur **"Créer le projet"**

### Étape 1.2 : Ajouter une application Web

1. Dans la page d'accueil du projet, cliquez sur l'icône **Web** (`</>`)
2. Donnez un nom à votre app : `Gestion Église`
3. **NE cochez PAS** "Firebase Hosting"
4. Cliquez sur **"Enregistrer l'application"**
5. **IMPORTANT** : Copiez les informations de configuration (vous en aurez besoin plus tard)

```javascript
// Exemple de configuration (VOS VALEURS SERONT DIFFÉRENTES)
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "chapelle-pleine-de-gloire.firebaseapp.com",
  projectId: "chapelle-pleine-de-gloire",
  storageBucket: "chapelle-pleine-de-gloire.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

---

## 2. Configuration de Firebase Authentication

### Étape 2.1 : Activer l'authentification par email/mot de passe

1. Dans le menu de gauche, cliquez sur **"Authentication"**
2. Cliquez sur **"Get started"** (si c'est votre première fois)
3. Cliquez sur l'onglet **"Sign-in method"**
4. Cliquez sur **"Email/Password"**
5. **Activez** la première option (Email/Password)
6. Cliquez sur **"Save"**

### Étape 2.2 : Créer le premier compte pasteur (optionnel)

Vous pouvez créer un compte depuis l'application ou via la console :

1. Allez dans l'onglet **"Users"**
2. Cliquez sur **"Add user"**
3. Entrez un email et un mot de passe
4. Cliquez sur **"Add user"**
5. **IMPORTANT** : Après création, allez dans Firestore pour ajouter le rôle "pasteur" (voir étape 3.3)

---

## 3. Configuration de Firestore Database

### Étape 3.1 : Créer la base de données

1. Dans le menu de gauche, cliquez sur **"Firestore Database"**
2. Cliquez sur **"Create database"**
3. Choisissez **"Start in test mode"** (nous ajouterons des règles de sécurité après)
4. Choisissez une localisation proche de vous (ex: `europe-west` pour l'Europe)
5. Cliquez sur **"Enable"**

### Étape 3.2 : Créer les collections

Firestore se créera automatiquement quand vous ajouterez des données, mais voici la structure :

#### Collection `users`
Stocke les informations des utilisateurs authentifiés.

```
users/
  ├── {userId}/
      ├── name: "Pasteur Jean Martin"
      ├── email: "pasteur@chapelle.com"
      ├── role: "pasteur" ou "recenseur"
      └── createdAt: "2024-01-15T10:30:00.000Z"
```

#### Collection `fideles`
Stocke les informations des fidèles/membres de l'église.

```
fideles/
  ├── {fideleId}/
      ├── nom: "Dupont"
      ├── prenom: "Jean"
      ├── photo: "https://firebasestorage.googleapis.com/..." (URL)
      ├── dateAdhesion: "2024-01-15"
      ├── fonction: "Ancien"
      ├── service: "Direction"
      ├── telephone: "+33612345678"
      └── lieuResidence: "Paris"
```

#### Collection `presences`
Stocke les présences des fidèles.

```
presences/
  ├── {presenceId}/
      ├── fideleId: "abc123" (référence au fidèle)
      ├── date: "2024-02-11" (format YYYY-MM-DD)
      ├── present: true ou false
      └── markedAt: "2024-02-11T09:30:00.000Z"
```

### Étape 3.3 : Ajouter le rôle au premier utilisateur

Après avoir créé votre premier compte (via l'app ou la console) :

1. Allez dans **Firestore Database**
2. Trouvez la collection `users`
3. Cliquez sur le document correspondant à votre utilisateur
4. Ajoutez un champ `role` avec la valeur `"pasteur"`
5. Cliquez sur **"Update"**

---

## 4. Configuration de Firebase Storage

### Étape 4.1 : Activer Storage

1. Dans le menu de gauche, cliquez sur **"Storage"**
2. Cliquez sur **"Get started"**
3. Choisissez **"Start in test mode"**
4. Choisissez la même localisation que Firestore
5. Cliquez sur **"Done"**

### Étape 4.2 : Structure des dossiers

L'application créera automatiquement le dossier suivant :

```
storage/
  └── photos/
      ├── fidele1_1234567890.jpg
      ├── fidele2_1234567891.jpg
      └── ...
```

Les photos sont nommées avec l'ID du fidèle et un timestamp.

---

## 5. Configuration des clés dans l'application

### Étape 5.1 : Localiser le fichier de configuration

Ouvrez le fichier `/utils/firebase/config.ts`

### Étape 5.2 : Remplacer les valeurs

Remplacez les valeurs par défaut par VOS valeurs obtenues à l'étape 1.2 :

```typescript
// /utils/firebase/config.ts

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",                    // ← Remplacez ici
  authDomain: "VOTRE_PROJECT.firebaseapp.com", // ← Remplacez ici
  projectId: "VOTRE_PROJECT_ID",               // ← Remplacez ici
  storageBucket: "VOTRE_PROJECT.appspot.com",  // ← Remplacez ici
  messagingSenderId: "VOTRE_SENDER_ID",        // ← Remplacez ici
  appId: "VOTRE_APP_ID"                        // ← Remplacez ici
};

// Ne pas modifier le code ci-dessous
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

### ⚠️ IMPORTANT - Sécurité

**NE PARTAGEZ JAMAIS** vos clés Firebase publiquement (GitHub, etc.). Bien que ces clés soient côté client, ajoutez toujours des règles de sécurité (voir section 7).

---

## 6. Structure des données

### 6.1 : Format des dates

- **dateAdhesion** : Format ISO `"YYYY-MM-DD"` (ex: `"2024-02-11"`)
- **date** (présences) : Format ISO `"YYYY-MM-DD"` (ex: `"2024-02-11"`)
- **createdAt** : Format ISO complet `"YYYY-MM-DDTHH:mm:ss.sssZ"` (ex: `"2024-02-11T09:30:00.000Z"`)

### 6.2 : Fonctions disponibles

```javascript
const FONCTIONS = [
  'Pasteur',
  'Ancien',
  'Diacre',
  'Évangéliste',
  'Chantre',
  'Trésorier',
  'Secrétaire',
  'Membre',
  'Autre',
];
```

### 6.3 : Services disponibles

```javascript
const SERVICES = [
  'Direction',
  'Accueil',
  'Louange',
  'Intercession',
  'Enseignement',
  'Jeunesse',
  'Enfants',
  'Évangélisation',
  'Administration',
  'Média',
  'Technique',
  'Social',
  'Autre',
];
```

---

## 7. Règles de sécurité

### 7.1 : Règles Firestore

Allez dans **Firestore Database** → **Rules** et remplacez par :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Fonction pour vérifier si l'utilisateur est authentifié
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Fonction pour vérifier si l'utilisateur est pasteur
    function isPasteur() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'pasteur';
    }
    
    // Collection users : lecture seule pour les authentifiés
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if request.auth.uid == userId || isPasteur();
    }
    
    // Collection fideles : pasteurs uniquement
    match /fideles/{fideleId} {
      allow read: if isAuthenticated();
      allow write: if isPasteur();
    }
    
    // Collection presences : tous les authentifiés peuvent lire et écrire
    match /presences/{presenceId} {
      allow read, write: if isAuthenticated();
    }
  }
}
```

**Cliquez sur "Publish"** pour appliquer les règles.

### 7.2 : Règles Storage

Allez dans **Storage** → **Rules** et remplacez par :

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Photos des fidèles : lecture pour tous les authentifiés, écriture pour les pasteurs
    match /photos/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
                      firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.role == 'pasteur';
    }
  }
}
```

**Cliquez sur "Publish"** pour appliquer les règles.

---

## 🎉 Félicitations !

Votre application est maintenant configurée et prête à être utilisée !

## 🚀 Prochaines étapes

1. **Testez l'application** avec le mode démo
2. **Créez votre premier compte** via l'interface de l'application
3. **Ajoutez le rôle "pasteur"** dans Firestore (étape 3.3)
4. **Ajoutez vos premiers fidèles**
5. **Enregistrez les présences** chaque dimanche

## 🆘 Dépannage

### Problème : "Firebase: Error (auth/unauthorized-domain)"

**Solution** : Ajoutez votre domaine aux domaines autorisés :
1. Allez dans **Authentication** → **Settings** → **Authorized domains**
2. Ajoutez votre domaine (ex: `localhost` pour le développement)

### Problème : "Missing or insufficient permissions"

**Solution** : Vérifiez vos règles de sécurité (section 7) et assurez-vous que l'utilisateur a le bon rôle dans Firestore.

### Problème : "Storage: Object 'photos/xxx' does not exist"

**Solution** : Vérifiez que Storage est bien activé et que les règles de sécurité sont appliquées.

### Problème : Les photos ne s'affichent pas

**Solution** : 
1. Vérifiez que Storage est activé
2. Vérifiez les règles de sécurité Storage
3. Vérifiez que l'URL de la photo dans Firestore est correcte

---

## 📞 Support

Pour toute question ou problème, vérifiez :
- La console Firebase pour les erreurs
- La console du navigateur (F12) pour les logs
- Les règles de sécurité sont bien appliquées
- Les clés Firebase sont correctement configurées

---

## 🔐 Sécurité - Bonnes pratiques

1. ✅ Ne partagez jamais vos clés sur GitHub ou publiquement
2. ✅ Utilisez toujours les règles de sécurité Firestore et Storage
3. ✅ Créez des sauvegardes régulières de votre base de données
4. ✅ Limitez les droits des recenseurs (déjà fait dans l'app)
5. ✅ Changez régulièrement les mots de passe des comptes pasteurs

---

**🙏 Que Dieu bénisse votre église et votre ministère !**
