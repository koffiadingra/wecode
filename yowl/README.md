# 📌 CT-comments

CT-comments est une application web permettant aux utilisateurs de **centraliser leurs commentaires** sur des posts provenant de **n'importe quelle plateforme** via l'URL du post. Elle offre une interface intuitive pour publier, modifier et supprimer des commentaires, tout en gérant les informations personnelles des utilisateurs.

---

## 📁 Structure du projet

Ce repository contient le projet nommé `C-DEV-160-ABJ-1-3-yowl-koffi.adingra`.

### Dossier principal : `YOWL`

- `api_laravel/` → Backend développé avec **Laravel 11**
- `ct_comment_front_end/` → Frontend développé avec **Vue 3**

---

## Fonctionnalités principales

- 🔗 Commenter des posts à partir de leur URL, quelle que soit la plateforme
- ✏️ Modifier ou supprimer ses propres commentaires
- 👤 Gérer ses informations personnelles (nom, email, mot de passe, etc.)
- 🧠 Interface utilisateur fluide et moderne avec Vue 3
- ⚙️ API REST robuste avec Laravel 11

---

## 🛠️ Installation

### Backend (Laravel 11)

```bash
cd YOWL/api_laravel
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve


### Frontend (Vue 3)

```bash
cd YOWL/ct_comment_front_end
npm install
npm run dev

---

Les contributions sont les bienvenues ! Pour proposer une amélioration, signaler un bug ou poser une question, vous pouvez me contacter directement par email : ulrich.pineiro@epitech.eu

---

Ce projet est sous licence MIT — vous êtes libre de l'utiliser, le modifier et le distribuer.

