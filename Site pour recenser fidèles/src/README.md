# 🏛️ Chapelle Pleine de Gloire - Système de Gestion

Application web de gestion d'église développée avec **React**, **TypeScript**, **Tailwind CSS** et **Firebase**.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## 📋 Fonctionnalités

### 👤 Système de rôles à 2 niveaux

#### 🔑 Espace Pasteur (Accès complet)
- ✅ Gestion complète des fidèles (ajout, modification, suppression)
- ✅ Enregistrement des présences
- ✅ Consultation des statistiques détaillées
- ✅ Export PDF des présences avec photos
- ✅ Gestion des fonctions et services

#### 📋 Espace Recenseur (Accès limité)
- ✅ Enregistrement des présences uniquement
- ✅ Consultation de la liste des fidèles (lecture seule)
- ❌ Pas d'accès à la gestion des fidèles
- ❌ Pas d'accès aux statistiques

### 📊 Gestion des fidèles
- ✅ Fiche complète : Nom, Prénom, Photo, Date d'adhésion
- ✅ Informations de contact : Téléphone, Lieu de résidence
- ✅ Organisation : Fonction (Pasteur, Ancien, Diacre, etc.)
- ✅ Affectation : Service (Direction, Louange, Jeunesse, etc.)
- ✅ Filtres par fonction et service
- ✅ Recherche par nom/prénom
- ✅ Upload et gestion des photos

### 📅 Gestion des présences
- ✅ Marquage rapide : Présent/Absent pour chaque dimanche
- ✅ Sélection de la date du culte
- ✅ Compteurs en temps réel (Présents/Absents)
- ✅ Historique complet des présences
- ✅ Export PDF avec photos et statistiques

### 📈 Statistiques (Pasteur uniquement)
- ✅ Total des fidèles
- ✅ Nouveaux membres du mois
- ✅ Taux de présence moyen
- ✅ Historique des 10 derniers cultes
- ✅ Répartition par fonction
- ✅ Répartition par service
- ✅ Graphiques et visualisations

---

## 🚀 Installation et Configuration

### Prérequis
- Node.js 16+ et npm
- Un compte Firebase (gratuit)

### Installation

1. **Cloner le projet** (si applicable) ou utiliser directement Figma Make

2. **Configurer Firebase** 
   
   📖 **[Suivez le guide complet de configuration Firebase](./GUIDE_FIREBASE.md)**
   
   Ce guide vous explique étape par étape :
   - Comment créer un projet Firebase
   - Comment configurer Authentication, Firestore et Storage
   - Comment obtenir vos clés de configuration
   - Comment configurer les règles de sécurité

3. **Configurer les clés Firebase**
   
   Ouvrez `/utils/firebase/config.ts` et remplacez les valeurs par vos clés Firebase :
   
   ```typescript
   const firebaseConfig = {
     apiKey: "VOTRE_API_KEY",
     authDomain: "VOTRE_PROJECT.firebaseapp.com",
     projectId: "VOTRE_PROJECT_ID",
     storageBucket: "VOTRE_PROJECT.appspot.com",
     messagingSenderId: "VOTRE_SENDER_ID",
     appId: "VOTRE_APP_ID"
   };
   ```

4. **Démarrer l'application**
   
   L'application se lance automatiquement dans Figma Make.

---

## 🎮 Utilisation

### Première connexion

1. Cliquez sur **"Créer un compte"**
2. Remplissez le formulaire :
   - Nom complet
   - Email
   - Mot de passe (6 caractères minimum)
   - Rôle : Pasteur ou Recenseur
3. Cliquez sur **"Créer un compte"**
4. Connectez-vous avec vos identifiants

### Navigation

#### Dashboard
Point central de l'application avec accès rapide à :
- Gestion des fidèles (Pasteur uniquement)
- Liste de présence (Tous)
- Statistiques (Pasteur uniquement)

#### Gestion des fidèles (Pasteur)
1. Cliquez sur **"Gestion des fidèles"**
2. Ajoutez un nouveau fidèle avec le bouton **"+"**
3. Remplissez le formulaire complet
4. Uploadez une photo (optionnel)
5. Utilisez les filtres pour retrouver facilement les fidèles

#### Liste de présence (Tous)
1. Cliquez sur **"Liste de présence"**
2. Sélectionnez la date du culte
3. Marquez chaque fidèle comme **Présent** ✓ ou **Absent** ✗
4. Les compteurs se mettent à jour en temps réel
5. Téléchargez le PDF pour l'archivage

#### Statistiques (Pasteur)
1. Cliquez sur **"Statistiques"**
2. Consultez les métriques clés
3. Visualisez l'historique des présences
4. Analysez les répartitions par fonction et service

---

## 📱 Technologies utilisées

### Frontend
- **React 18** - Framework JavaScript
- **TypeScript** - Typage statique
- **Tailwind CSS v4** - Framework CSS
- **React Router** - Navigation
- **Lucide React** - Icônes
- **jsPDF** - Génération de PDF

### Backend
- **Firebase Authentication** - Gestion des utilisateurs
- **Firestore Database** - Base de données NoSQL
- **Firebase Storage** - Stockage des photos
- **Firebase Analytics** - Suivi d'utilisation

### UI Components
- Composants personnalisés basés sur shadcn/ui
- Design moderne et responsive
- Animations fluides

---

## 📊 Structure des données

### Collection `users`
```typescript
{
  name: string;
  email: string;
  role: 'pasteur' | 'recenseur';
  createdAt: string;
}
```

### Collection `fideles`
```typescript
{
  nom: string;
  prenom: string;
  photo: string | null;
  dateAdhesion: string;
  fonction?: string;
  service?: string;
  telephone?: string;
  lieuResidence?: string;
}
```

### Collection `presences`
```typescript
{
  fideleId: string;
  date: string;
  present: boolean;
  markedAt: string;
}
```

---

## 🔒 Sécurité

### Règles de sécurité Firestore
- ✅ Authentification obligatoire pour toutes les opérations
- ✅ Les recenseurs peuvent uniquement gérer les présences
- ✅ Les pasteurs ont un accès complet
- ✅ Chaque utilisateur ne peut modifier que ses propres données

### Règles de sécurité Storage
- ✅ Les photos sont accessibles en lecture à tous les authentifiés
- ✅ Upload de photos limité aux utilisateurs authentifiés
- ✅ Limite de taille de fichier (5 Mo maximum)

### Bonnes pratiques
- 🔐 Mots de passe minimum 6 caractères
- 🔐 Sessions sécurisées via Firebase Auth
- 🔐 Règles de sécurité strictes côté serveur
- 🔐 Validation des données côté client et serveur

---

## 📦 Export de données

### Export PDF des présences
- Format professionnel avec photos des fidèles
- Informations complètes : Nom, Prénom, Fonction, Service, Téléphone, Résidence
- Statistiques incluses (Total, Présents, Absents, Taux)
- Nom du fichier : `presence_YYYY-MM-DD.pdf`

---

## 🎨 Personnalisation

### Modifier le nom de l'église
Le nom "Chapelle Pleine de Gloire" apparaît dans :
- `/components/Login.tsx` - Page de connexion
- `/components/Dashboard.tsx` - Dashboard
- `/components/FidelesList.tsx` - Page fidèles
- `/components/Presences.tsx` - Page présences
- `/components/Statistiques.tsx` - Page statistiques

Recherchez `"Chapelle Pleine de Gloire"` et remplacez par le nom de votre église.

### Ajouter des fonctions/services
Modifiez les tableaux dans `/components/FidelesList.tsx` :

```typescript
const FONCTIONS = ['Pasteur', 'Ancien', 'Votre fonction', ...];
const SERVICES = ['Direction', 'Louange', 'Votre service', ...];
```

### Modifier les couleurs
Les couleurs principales sont définies dans `/styles/globals.css` via les tokens Tailwind v4.

---

## 🐛 Dépannage

### "Firebase: Error (auth/unauthorized-domain)"
➡️ Ajoutez votre domaine dans Authentication → Settings → Authorized domains

### "Missing or insufficient permissions"
➡️ Vérifiez les règles de sécurité Firestore et Storage

### Les photos ne s'affichent pas
➡️ Vérifiez que Firebase Storage est activé et configuré

### L'utilisateur n'a pas le bon rôle
➡️ Modifiez manuellement le champ `role` dans Firestore (collection `users`)

### Plus de détails
📖 Consultez le [Guide Firebase complet](./GUIDE_FIREBASE.md)

---

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer.

---

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer des nouvelles fonctionnalités
- Améliorer la documentation

---

## 📞 Support

Pour toute question ou assistance :
1. Consultez d'abord le [Guide Firebase](./GUIDE_FIREBASE.md)
2. Vérifiez la console Firebase pour les erreurs
3. Consultez la console du navigateur (F12)

---

## 🙏 Remerciements

Développé avec ❤️ pour faciliter la gestion des églises et communautés.

**Que Dieu bénisse votre ministère !** 🙌

---

## 🗺️ Roadmap

### Version actuelle : 1.0.0
- ✅ Système de rôles Pasteur/Recenseur
- ✅ Gestion complète des fidèles
- ✅ Enregistrement des présences
- ✅ Statistiques détaillées
- ✅ Export PDF avec photos

### Futures améliorations possibles
- 📧 Envoi d'emails aux absents
- 📊 Graphiques avancés (courbes, camemberts)
- 💰 Gestion des offrandes/dîmes
- 📅 Calendrier des événements
- 👥 Gestion des groupes de maison
- 📱 Application mobile
- 🔔 Notifications push
- 📖 Gestion de la bibliothèque
- 🎤 Planning des services

---

**Version :** 1.0.0  
**Dernière mise à jour :** Février 2026  
**Développé avec Figma Make**
