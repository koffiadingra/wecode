# 📋 Installation détaillée - ShareContact React Native

Ce guide vous accompagne pas à pas pour installer et tester l'application React Native.

## 🖥️ Configuration de votre ordinateur

### Étape 1 : Installer Node.js

1. Allez sur https://nodejs.org/
2. Téléchargez la version **LTS** (Long Term Support)
3. Installez Node.js en suivant l'assistant d'installation
4. Vérifiez l'installation :

```bash
node --version
# Devrait afficher : v18.x.x ou plus

npm --version  
# Devrait afficher : 9.x.x ou plus
```

### Étape 2 : Installer Expo CLI

Expo CLI est l'outil qui va gérer l'application React Native.

```bash
npm install -g expo-cli
```

Vérifiez l'installation :

```bash
expo --version
# Devrait afficher la version d'Expo
```

## 📱 Configuration de votre téléphone

### Android

1. Ouvrez le **Play Store**
2. Recherchez **"Expo Go"**
3. Installez l'application
4. (Optionnel) Créez un compte Expo pour synchroniser vos projets

### iOS

1. Ouvrez l'**App Store**
2. Recherchez **"Expo Go"**
3. Installez l'application
4. (Optionnel) Créez un compte Expo pour synchroniser vos projets

## 💻 Installation du projet

### Étape 1 : Ouvrir un terminal

- **Windows** : Appuyez sur `Win + R`, tapez `cmd`, puis `Entrée`
- **Mac** : Appuyez sur `Cmd + Espace`, tapez `terminal`, puis `Entrée`
- **Linux** : `Ctrl + Alt + T`

### Étape 2 : Naviguer vers le dossier

```bash
# Remplacez le chemin par l'emplacement de votre dossier react-native
cd /chemin/vers/react-native
```

Exemples :
```bash
# Windows
cd C:\Users\VotreNom\Documents\sharecontact\react-native

# Mac/Linux
cd ~/Documents/sharecontact/react-native
```

### Étape 3 : Installer les dépendances

Cette étape peut prendre quelques minutes.

```bash
npm install
```

Vous devriez voir :
```
added 1500+ packages in 2m
```

### Étape 4 : Démarrer l'application

```bash
npm start
```

ou

```bash
expo start
```

Après quelques secondes, vous verrez :
```
Metro waiting on exp://192.168.x.x:8081
› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
```

Un **QR Code** s'affichera également dans le terminal.

## 📲 Lancer sur votre téléphone

### Méthode 1 : Scan du QR Code (Recommandé)

#### Android
1. Ouvrez **Expo Go**
2. Appuyez sur **"Scan QR Code"**
3. Scannez le QR Code dans votre terminal
4. L'app se charge automatiquement

#### iOS
1. Ouvrez l'**appareil photo** natif
2. Pointez vers le QR Code
3. Appuyez sur la notification qui apparaît
4. L'app s'ouvre dans Expo Go

### Méthode 2 : Connexion au même réseau Wi-Fi

1. Assurez-vous que votre ordinateur et votre téléphone sont sur le **même réseau Wi-Fi**
2. Ouvrez **Expo Go**
3. L'application devrait apparaître dans la liste
4. Appuyez dessus pour la lancer

### Méthode 3 : Mode Tunnel (si les autres méthodes ne fonctionnent pas)

```bash
npm start -- --tunnel
```

Cela crée un tunnel internet et fonctionne même si vous n'êtes pas sur le même réseau.

## 🧪 Tester l'application

### Test 1 : Ajouter un contact

1. Dans l'app, appuyez sur **"+ Ajouter un contact"**
2. Remplissez les champs :
   - Prénom : Jean
   - Nom : Dupont
   - Email : jean.dupont@example.com
   - Téléphone : +33612345678
3. Appuyez sur **"✓ Ajouter"**
4. Le contact apparaît dans la liste

### Test 2 : Générer un QR Code

1. Sur le contact créé, appuyez sur **"📱 QR Code"**
2. Confirmez le partage
3. Un QR Code s'affiche

### Test 3 : Tester le NFC (optionnel)

**Prérequis** :
- Téléphone avec NFC
- NFC activé dans les paramètres
- Puce NFC vierge

**Étapes** :
1. Sur le contact, appuyez sur **"📡 NFC"**
2. Confirmez le partage
3. Approchez la puce NFC de votre téléphone
4. Attendez la confirmation

## 🔧 Émulateurs (Optionnel)

### Android Studio (Windows/Mac/Linux)

1. Installez Android Studio
2. Configurez un émulateur
3. Lancez :

```bash
npm run android
```

### Xcode (Mac uniquement)

1. Installez Xcode depuis l'App Store
2. Lancez :

```bash
npm run ios
```

## 🐛 Résolution de problèmes

### Erreur : "Cannot find module"

```bash
rm -rf node_modules
npm install
```

### Erreur : "Metro bundler stopped"

```bash
npm start -- --clear
```

### Le QR Code ne s'affiche pas

```bash
expo start --tunnel
```

### L'application ne se charge pas

1. Vérifiez que vous êtes sur le même Wi-Fi
2. Redémarrez Metro : appuyez sur `r` dans le terminal
3. Redémarrez Expo Go

### Erreur de permissions NFC

**Android** :
1. Paramètres > Connexions > NFC
2. Activez le NFC

**iOS** :
- Le NFC ne fonctionne pas dans Expo Go
- Vous devez utiliser EAS Build pour tester le NFC sur iOS

## 📊 Codes de statut

Lorsque vous lancez l'app :

| Message | Signification |
|---------|--------------|
| `Starting Metro Bundler` | Démarrage en cours |
| `Metro waiting on...` | Prêt, scannez le QR |
| `Building JavaScript bundle` | Compilation du code |
| `Finished building JavaScript bundle` | Application prête |

## 🎓 Prochaines étapes

Maintenant que l'application fonctionne :

1. **Explorez** les fonctionnalités
2. **Modifiez** le code dans `App.tsx`
3. **Personnalisez** les couleurs
4. **Ajoutez** vos propres contacts
5. **Testez** sur plusieurs appareils

## 📚 Ressources

- [Documentation Expo](https://docs.expo.dev)
- [React Native Tutorial](https://reactnative.dev/docs/tutorial)
- [Guide NFC](https://github.com/revtel/react-native-nfc-manager)

## 🆘 Besoin d'aide ?

Si vous rencontrez des problèmes :

1. Consultez le [QUICKSTART.md](./QUICKSTART.md)
2. Lisez le [README.md](./README.md) complet
3. Vérifiez la documentation Expo
4. Nettoyez le cache : `npm start -- --clear`

Bon développement ! 🚀
