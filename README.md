# Yam  - Jeu en ligne multijoueur

## 🎲 Règles du jeu

Le Yam est un jeu de dés classique où l'objectif est de réaliser des combinaisons pour marquer le plus de points possible.

### Déroulement d'une partie
- Chaque joueur joue avec 5 dés
- À votre tour, vous avez droit à 3 lancers maximum
- Après chaque lancer, vous pouvez conserver certains dés et relancer les autres
- Une fois votre combinaison choisie, les points sont comptabilisés 

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
