# ✨ COMMENCEZ ICI - ShareContact React Native

## 🎯 Vous êtes au bon endroit !

Ce dossier contient l'application **React Native** complète et prête à l'emploi.

---

## 🚀 Lancement en 3 étapes

### Étape 1 : Installez Expo Go 📱

Scannez ce QR Code avec votre téléphone :

**Android** : https://play.google.com/store/apps/details?id=host.exp.exponent

**iOS** : https://apps.apple.com/app/expo-go/id982107779

### Étape 2 : Ouvrez un terminal ici 💻

```bash
# Vous devez être dans le dossier react-native/
pwd  # ou cd pour vérifier
```

### Étape 3 : Lancez l'app 🎬

```bash
npm install    # Première fois seulement
npm start      # Lance l'application
```

**→ Un QR Code s'affiche dans votre terminal**

**→ Scannez-le avec Expo Go**

**→ L'application se charge automatiquement !**

---

## 📖 Documentation

Choisissez votre guide selon votre niveau :

| 🎯 Besoin | 📄 Fichier | ⏱️ Durée |
|----------|-----------|---------|
| **Démarrer rapidement** | [QUICKSTART.md](./QUICKSTART.md) | 5 min |
| **Installation détaillée** | [INSTALLATION.md](./INSTALLATION.md) | 15 min |
| **Documentation complète** | [README.md](./README.md) | 30 min |
| **Structure du projet** | [STRUCTURE.txt](./STRUCTURE.txt) | 5 min |

---

## 🎨 Ce que vous pouvez faire

✅ **Gestion de contacts**
- Créer, modifier, supprimer des contacts
- Validation en temps réel
- Stockage sécurisé

✅ **Partage par QR Code**
- Génération instantanée
- Compatible tous appareils
- Format vCard standard

✅ **Partage par NFC**
- Écriture sur puces NFC
- Lecture de puces NFC
- Protection avancée

✅ **Sécurité**
- Validation des données
- Rate limiting
- Logging des événements
- Protection contre les attaques

---

## 🛠️ Commandes essentielles

```bash
# Démarrer l'application
npm start

# Démarrer avec cache propre
npm start -- --clear

# Android (émulateur)
npm run android

# iOS (simulateur, Mac)
npm run ios
```

---

## ❓ FAQ Express

### Q : J'ai une erreur "Cannot find module"
```bash
npm install
```

### Q : Le QR Code ne s'affiche pas
```bash
npm start -- --tunnel
```

### Q : L'app ne se charge pas
1. Vérifiez que téléphone et PC sont sur le même Wi-Fi
2. Essayez : `npm start -- --tunnel`
3. Redémarrez : appuyez sur `r` dans le terminal

### Q : Comment tester le NFC ?
- Activez le NFC dans les paramètres de votre téléphone
- Ayez une puce NFC vierge à disposition
- Sur iOS : utilisez EAS Build (Expo Go ne supporte pas le NFC)

---

## 📂 Fichiers importants

```
react-native/
│
├── 🎯 App.tsx                    ← Code principal
├── 📦 package.json               ← Dépendances
├── ⚙️ app.json                   ← Configuration
│
├── 📂 components/                ← Composants UI
│   ├── ContactFormRN.tsx
│   ├── ContactCardRN.tsx
│   ├── QRCodeDisplayRN.tsx
│   ├── AuthorizationModalRN.tsx
│   └── SecurityStatusRN.tsx
│
├── 📂 utils/                     ← Logique métier
│   ├── security.ts
│   ├── nfcSecurity.ts
│   └── storage.ts
│
└── 📂 types/                     ← Types TypeScript
    └── contact.ts
```

---

## 🎓 Après l'installation

1. **Testez les fonctionnalités**
   - Ajoutez un contact
   - Générez un QR Code
   - Testez le NFC

2. **Explorez le code**
   - Ouvrez `App.tsx`
   - Regardez les composants
   - Modifiez les styles

3. **Personnalisez**
   - Changez les couleurs
   - Ajoutez vos icônes
   - Adaptez les textes

4. **Buildez pour production**
   - `eas build --platform android`
   - `eas build --platform ios`

---

## 🎯 Checklist de démarrage

- [ ] ✅ Node.js installé (`node --version`)
- [ ] ✅ Expo Go installé sur le téléphone
- [ ] ✅ Terminal ouvert dans `react-native/`
- [ ] ✅ `npm install` exécuté
- [ ] ✅ `npm start` lancé
- [ ] ✅ QR Code scanné
- [ ] ✅ App chargée et fonctionnelle

---

## 💬 Besoin d'aide ?

1. 📖 Consultez [QUICKSTART.md](./QUICKSTART.md)
2. 📖 Lisez [INSTALLATION.md](./INSTALLATION.md)
3. 📖 Explorez [README.md](./README.md)
4. 🔍 Cherchez dans la [doc Expo](https://docs.expo.dev)

---

## ✨ Prêt ? C'est parti !

```bash
npm install && npm start
```

**Scannez le QR Code avec Expo Go et profitez de l'app ! 🎉**

---

💡 **Astuce** : Gardez ce fichier ouvert pendant votre développement comme référence rapide !
