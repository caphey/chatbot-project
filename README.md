# Projet Chatbot

Ce projet est une application de chatbot développée avec Python et React Native.

## Comment ça fonctionne

Le chatbot fonctionne en deux parties : le backend et le frontend.

Le backend, écrit en Python, est le cerveau du chatbot. Il reçoit les messages de l'utilisateur, les traite et renvoie une réponse. Le traitement peut impliquer l'utilisation de l'intelligence artificielle pour comprendre la requête de l'utilisateur et générer une réponse appropriée.

Le frontend, écrit en React Native, est l'interface utilisateur du chatbot. Il envoie les messages de l'utilisateur au backend et affiche les réponses du backend à l'utilisateur.

## Fonctionnalités

- Réponse aux questions de l'utilisateur en temps réel
- Interface utilisateur intuitive

## Améliorations futures

- Amélioration de l'intelligence artificielle pour comprendre des requêtes plus complexes
- Ajout de plus de langues
- Intégration avec plus de services tiers
- Amélioration de l'interface utilisateur

## Structure

Le projet est divisé en deux parties principales :

1. Le serveur backend, écrit en Python, situé dans le répertoire racine. Le point d'entrée principal est `main.py`.

2. L'application mobile frontend, écrite en React Native, située dans le répertoire `ChatApp`. Le point d'entrée principal est `App.js`.

## Installation

Pour installer le projet, vous devez installer les dépendances pour le backend et le frontend.

```bash
cd ChatApp
```

```bash
npm install
```

Exécution du projet
Pour exécuter le serveur backend :

```bash
python main.py
```

Pour exécuter l'application frontend :

```bash
npx expo start --web
```
