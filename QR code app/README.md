# ShareContact - Version React Native

Application mobile native de partage de contacts sécurisés par QR Code et NFC.

## 🚀 Installation

### Prérequis

- Node.js 18+ installé
- Expo CLI : `npm install -g expo-cli`
- Un téléphone Android ou iOS avec l'application Expo Go installée
- OU un émulateur Android/iOS configuré

### Étapes d'installation

1. **Ouvrez un terminal dans le dossier `react-native`**
```bash
cd react-native
```

2. **Installez les dépendances**
```bash
npm install
```

3. **Démarrez le serveur de développement**
```bash
npm start
# ou
expo start
```

4. **Lancez sur un appareil**

**Sur téléphone physique :**
- Scannez le QR Code affiché avec l'application Expo Go
- Android : dans l'application Expo Go
- iOS : avec l'appareil photo natif

**Sur émulateur :**
```bash
# Android
npm run android

# iOS (Mac uniquement)
npm run ios
```

## 📱 Fonctionnalités

### ✅ Gestion des contacts
- Ajouter des contacts avec validation complète
- Champs : Prénom, Nom, Email, Téléphone, Entreprise, Poste, Site web
- Validation en temps réel
- Stockage local sécurisé avec AsyncStorage

### 📱 Partage par QR Code
- Génération instantanée de QR Code
- Format vCard 3.0 standard
- Compatible avec tous les scanners de QR Code
- Modal de confirmation avant partage

### 📡 Partage par NFC
- Écriture sécurisée sur puces NFC
- Lecture de puces NFC
- Détection automatique de la disponibilité NFC
- Protection contre les attaques NFC

### 🔒 Sécurité renforcée
- Validation stricte de tous les champs
- Sanitisation des données
- Protection contre les injections
- Rate limiting (limite de tentatives)
- Logging des événements de sécurité
- Détection d'anomalies en temps réel
- Chiffrement des données sensibles

### ⚡ Retour haptique
- Vibrations lors des interactions importantes
- Confirmation tactile des actions
- Améliore l'expérience utilisateur

## 🛠️ Configuration NFC

### Android

Le NFC est activé par défaut. Assurez-vous que :
1. Le NFC est activé dans les paramètres du téléphone
2. L'application a les permissions nécessaires (déjà configurées)

### iOS

Pour tester le NFC sur iOS :
1. Seuls les iPhones 7 et plus récents supportent le NFC
2. Le NFC fonctionne uniquement sur un appareil physique (pas d'émulateur)
3. Vous devez construire l'app avec EAS Build :
```bash
eas build --platform ios
```

## 📦 Structure du projet

```
react-native/
├── App.tsx                          # Point d'entrée principal
├── app.json                         # Configuration Expo
├── package.json                     # Dépendances
├── types/
│   └── contact.ts                   # Type TypeScript pour les contacts
├── utils/
│   ├── security.ts                  # Fonctions de sécurité
│   ├── nfcSecurity.ts              # Gestionnaire NFC pour React Native
│   └── storage.ts                   # Stockage AsyncStorage
└── components/
    ├── ContactFormRN.tsx            # Formulaire d'ajout de contact
    ├── ContactCardRN.tsx            # Carte de contact
    ├── QRCodeDisplayRN.tsx          # Affichage QR Code
    ├── AuthorizationModalRN.tsx     # Modal de confirmation
    └── SecurityStatusRN.tsx         # Statut de sécurité
```

## 🔐 Sécurité

### Protections implémentées

1. **Validation des entrées**
   - Regex strictes pour tous les champs
   - Limite de longueur des champs
   - Caractères dangereux bloqués

2. **Protection NFC**
   - Vérification de la disponibilité sécurisée
   - Rate limiting (5 tentatives/minute)
   - Validation de la taille des données (max 2KB)
   - Détection de patterns suspects
   - Timeout de 10 secondes

3. **vCard sécurisée**
   - Format validé strictement
   - Pas de nested vCards
   - Pas de scripts ou code malveillant
   - Checksum pour vérifier l'intégrité

4. **Logging et monitoring**
   - Tous les événements sont loggés
   - Détection automatique d'anomalies
   - Logs consultables dans l'interface

## 📝 Utilisation

### Ajouter un contact

1. Appuyez sur le bouton "+ Ajouter un contact"
2. Remplissez le formulaire
3. Les champs avec * sont obligatoires
4. Appuyez sur "✓ Ajouter"

### Partager par QR Code

1. Appuyez sur "📱 QR Code" sur une carte de contact
2. Confirmez le partage dans le modal
3. Le QR Code s'affiche
4. L'autre personne scanne avec son appareil

### Partager par NFC

1. Appuyez sur "📡 NFC" sur une carte de contact
2. Confirmez le partage dans le modal
3. Approchez votre téléphone d'une puce NFC
4. Attendez la confirmation

## 🚨 Dépannage

### NFC ne fonctionne pas

**Android :**
- Vérifiez que le NFC est activé dans Paramètres > Connexions > NFC
- Redémarrez l'application
- Essayez avec une autre puce NFC

**iOS :**
- Le NFC ne fonctionne pas dans Expo Go
- Vous devez construire l'app en standalone
- Utilisez EAS Build

### QR Code ne scanne pas

- Assurez-vous que l'écran est bien lumineux
- Nettoyez l'objectif de l'appareil photo
- Essayez de vous éloigner ou rapprocher

### Problèmes d'installation

```bash
# Nettoyer le cache
npm cache clean --force
rm -rf node_modules
npm install

# Réinitialiser Metro
expo start -c
```

## 🔄 Build de production

### Android (APK)

```bash
# Build APK pour Android
eas build --platform android --profile preview
```

### iOS (IPA)

```bash
# Build IPA pour iOS (nécessite un compte Apple Developer)
eas build --platform ios
```

## 📄 Dépendances principales

- **expo** : Framework React Native
- **react-native-nfc-manager** : Gestion du NFC
- **react-native-qrcode-svg** : Génération de QR codes
- **@react-native-async-storage/async-storage** : Stockage local
- **expo-haptics** : Retour haptique

## 🤝 Support

Pour toute question ou problème :
- Documentation Expo : https://docs.expo.dev
- Documentation NFC : https://docs.expo.dev/guides/using-nfc/
- React Native docs : https://reactnative.dev/docs/getting-started

## 📱 Tester l'application

1. Installez Expo Go sur votre téléphone
2. Lancez `npm start` dans le dossier `react-native`
3. Scannez le QR Code avec Expo Go
4. L'application se charge automatiquement

Bon développement ! 🚀
