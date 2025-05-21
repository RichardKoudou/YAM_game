# Yam - Jeu en ligne multijoueur

## 🎲 Règles du jeu

Le Yam est un jeu de dés classique où l'objectif est de réaliser des combinaisons pour marquer le plus de points possible.

### Déroulement d'une partie
- Chaque joueur joue avec 5 dés
- À votre tour, vous avez droit à 3 lancers maximum
- Après chaque lancer, vous pouvez conserver certains dés et relancer les autres
- Une fois votre combinaison choisie, les points sont comptabilisés

## 🛠 Stack Technique

### Frontend
- **React Native** avec **Expo** pour le développement cross-platform
- Architecture basée sur les composants React avec gestion d'état locale
- Système de thème personnalisé pour une UI cohérente
- Animations natives pour une expérience utilisateur fluide

### Backend
- **Node.js** avec **Express** pour le serveur HTTP
- **Socket.IO** pour la communication en temps réel
- Architecture événementielle pour la gestion des parties

### Communication
- WebSocket pour les échanges en temps réel
- Protocole client-serveur optimisé pour les jeux multijoueurs
- Gestion des événements de jeu (tours, scores, fin de partie)

## 🏗 Architecture du Projet

### Structure Frontend
```
app/
├── components/           # Composants React Native
│   ├── board/           # Interface de jeu
│   ├── confetti/        # Animations de victoire
│   └── game-summary/    # Résumé de partie
├── contexts/            # Contextes React (Socket, Theme)
├── styles/              # Thème et styles globaux
└── services/            # Services (API, WebSocket)
```

### Structure Backend
```
backend/
├── server.js           # Point d'entrée du serveur
├── game/               # Logique de jeu
└── socket/             # Gestionnaires Socket.IO
```

## 🚀 Installation

### Prérequis
- Node.js et npm installés sur votre machine
- Un terminal ou invite de commande

### Installation du Frontend (React Native)
```bash
# À la racine du projet
npm install
```

### Installation du Backend
```bash
# Dans le dossier backend
cd backend
npm install
```

## 🎮 Lancement des serveurs

### Frontend
```bash
# À la racine du projet
npx expo start
```

### Backend
```bash
# Dans le dossier backend
cd backend
npm run start
```

## 🌟 Fonctionnalités

- Interface utilisateur intuitive et réactive
- Système de matchmaking en ligne
- Timer pour chaque tour de jeu
- Animations des dés
- Système de score en temps réel
- Affichage des statistiques de fin de partie
- 2 modes de jeu : multijoueurs ou contre le bot

## 🎯 Comment jouer

1. Lancez l'application
2. Attendez qu'un autre joueur rejoigne la partie
3. À votre tour :
   - Lancez les dés (jusqu'à 3 fois)
   - Sélectionnez les dés à conserver
   - Choisissez votre combinaison
4. Surveillez votre timer et celui de votre adversaire
5. Accumulez le plus de points possible pour gagner !
