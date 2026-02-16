# 🔒 Règles de sécurité Firebase

Ce fichier contient les règles de sécurité à appliquer dans votre projet Firebase.

---

## 📋 Règles Firestore Database

Copiez-collez ces règles dans **Firestore Database** → **Rules** :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // ===== FONCTIONS HELPER =====
    
    // Vérifier si l'utilisateur est authentifié
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Vérifier si l'utilisateur est un pasteur
    function isPasteur() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'pasteur';
    }
    
    // Vérifier si l'utilisateur est un recenseur ou un pasteur
    function canManagePresences() {
      return isAuthenticated() && 
             exists(/databases/$(database)/documents/users/$(request.auth.uid));
    }
    
    // ===== RÈGLES PAR COLLECTION =====
    
    // Collection "users" : Informations des utilisateurs
    // - Lecture : Tous les utilisateurs authentifiés
    // - Écriture : L'utilisateur lui-même ou un pasteur
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if request.auth.uid == userId;
      allow update: if request.auth.uid == userId || isPasteur();
      allow delete: if isPasteur();
    }
    
    // Collection "fideles" : Liste des membres de l'église
    // - Lecture : Tous les utilisateurs authentifiés
    // - Écriture : Pasteurs uniquement
    match /fideles/{fideleId} {
      allow read: if isAuthenticated();
      allow write: if isPasteur();
    }
    
    // Collection "presences" : Enregistrement des présences
    // - Lecture : Tous les utilisateurs authentifiés
    // - Écriture : Tous les utilisateurs authentifiés (pasteurs et recenseurs)
    match /presences/{presenceId} {
      allow read: if isAuthenticated();
      allow write: if canManagePresences();
    }
  }
}
```

### 📝 Explications

**Collection `users` :**
- Tout utilisateur authentifié peut lire les informations des autres utilisateurs
- Un utilisateur peut créer son propre document lors de l'inscription
- Un utilisateur peut modifier ses propres informations
- Seuls les pasteurs peuvent supprimer des utilisateurs

**Collection `fideles` :**
- Lecture accessible à tous les authentifiés (pour afficher la liste)
- Création/Modification/Suppression réservée aux pasteurs uniquement

**Collection `presences` :**
- Lecture et écriture accessibles à tous les authentifiés
- Permet aux recenseurs d'enregistrer les présences
- Permet aux pasteurs de consulter et modifier toutes les données

---

## 🗄️ Règles Storage (Photos)

Copiez-collez ces règles dans **Storage** → **Rules** :

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // ===== FONCTIONS HELPER =====
    
    // Vérifier si l'utilisateur est authentifié
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Vérifier si l'utilisateur est un pasteur
    function isPasteur() {
      return isAuthenticated() && 
             firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.role == 'pasteur';
    }
    
    // Vérifier si le fichier est une image valide
    function isValidImage() {
      return request.resource.size < 5 * 1024 * 1024 && // Max 5MB
             request.resource.contentType.matches('image/.*');
    }
    
    // ===== RÈGLES POUR LES PHOTOS =====
    
    // Dossier "photos/" : Photos des fidèles
    // - Lecture : Tous les utilisateurs authentifiés
    // - Écriture : Pasteurs uniquement
    // - Validation : Images de max 5MB
    match /photos/{allPaths=**} {
      allow read: if isAuthenticated();
      allow write: if isPasteur() && isValidImage();
      allow delete: if isPasteur();
    }
  }
}
```

### 📝 Explications

**Photos des fidèles :**
- Tous les utilisateurs authentifiés peuvent voir les photos
- Seuls les pasteurs peuvent uploader de nouvelles photos
- Seuls les pasteurs peuvent supprimer des photos
- Validation : Fichiers images uniquement, taille maximale 5MB

---

## ⚠️ Important : Test des règles

### 1. Mode Test (Développement uniquement)

**NE PAS UTILISER EN PRODUCTION !**

Si vous voulez tester rapidement sans restrictions (développement seulement) :

**Firestore :**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2024, 12, 31);
    }
  }
}
```

**Storage :**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.time < timestamp.date(2024, 12, 31);
    }
  }
}
```

⚠️ **ATTENTION** : Ces règles expirent le 31/12/2024. Elles sont DANGEREUSES en production !

---

## 🧪 Tester les règles

### Dans la console Firebase :

1. Allez dans **Firestore Database** → **Rules**
2. Cliquez sur l'onglet **Playground**
3. Testez différents scénarios :

**Exemple 1 : Pasteur lit la liste des fidèles**
```
Location: /fideles/fidele123
Auth UID: (votre-uid-pasteur)
Read: Should ALLOW
```

**Exemple 2 : Recenseur essaie de modifier un fidèle**
```
Location: /fideles/fidele123
Auth UID: (votre-uid-recenseur)
Write: Should DENY
```

**Exemple 3 : Recenseur enregistre une présence**
```
Location: /presences/presence123
Auth UID: (votre-uid-recenseur)
Write: Should ALLOW
```

---

## 📊 Règles avancées (Optionnel)

### Limiter les créations de présences

Si vous voulez empêcher la création de doublons (même fidèle, même date) :

```javascript
match /presences/{presenceId} {
  allow read: if isAuthenticated();
  allow create: if canManagePresences() && 
                  !exists(/databases/$(database)/documents/presences/$(request.resource.data.fideleId + '_' + request.resource.data.date));
  allow update, delete: if canManagePresences();
}
```

### Validation des données

Ajouter des validations strictes sur les champs :

```javascript
match /fideles/{fideleId} {
  allow read: if isAuthenticated();
  allow create, update: if isPasteur() && 
    request.resource.data.keys().hasAll(['nom', 'prenom', 'dateAdhesion']) &&
    request.resource.data.nom is string &&
    request.resource.data.prenom is string &&
    request.resource.data.nom.size() > 0 &&
    request.resource.data.prenom.size() > 0;
  allow delete: if isPasteur();
}
```

### Journalisation des modifications

Ajouter automatiquement un champ `updatedAt` :

```javascript
match /fideles/{fideleId} {
  allow read: if isAuthenticated();
  allow create: if isPasteur();
  allow update: if isPasteur() && 
    request.resource.data.updatedAt == request.time;
  allow delete: if isPasteur();
}
```

---

## 🔍 Débogage des règles

### Erreur courante : "Missing or insufficient permissions"

**Causes possibles :**
1. L'utilisateur n'est pas authentifié
2. L'utilisateur n'a pas le bon rôle dans Firestore
3. Les règles ne sont pas encore déployées
4. Le document `users/{userId}` n'existe pas

**Solutions :**
1. Vérifiez que `request.auth != null`
2. Vérifiez le champ `role` dans `users/{userId}`
3. Cliquez sur "Publish" après avoir modifié les règles
4. Créez le document utilisateur après l'inscription

### Vérifier les logs

Allez dans **Firestore Database** → **Usage** pour voir les requêtes refusées.

---

## ✅ Checklist de sécurité

Avant de déployer en production :

- [ ] Les règles de test ont été remplacées par les règles sécurisées
- [ ] L'authentification est obligatoire pour toutes les opérations
- [ ] Les rôles sont correctement vérifiés
- [ ] Les photos sont limitées en taille (5MB max)
- [ ] Seules les images sont acceptées dans Storage
- [ ] Les règles ont été testées dans le Playground
- [ ] Les clés Firebase ne sont pas exposées publiquement

---

## 📚 Ressources

- [Documentation Firestore Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Documentation Storage Rules](https://firebase.google.com/docs/storage/security)
- [Testing Rules](https://firebase.google.com/docs/rules/unit-tests)

---

**🔒 La sécurité est essentielle - Ne négligez jamais cette étape !**
