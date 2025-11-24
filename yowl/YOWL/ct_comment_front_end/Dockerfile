FROM node:20-alpine

# Dossier de travail
WORKDIR /app

# Installer dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du projet
COPY . .

# Build Tailwind + Vue pour prod
RUN npm run build

# Installer un serveur léger pour servir la build
RUN npm install -g serve

# Lancer le build en prod
CMD ["serve", "-s", "dist", "-l", "8080"]

EXPOSE 8080
