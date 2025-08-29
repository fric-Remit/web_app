# WebAppRemit

Ce projet est une application web bancaire développée avec Angular 17 et utilise json-server pour simuler un backend REST.

---

## Démarrage du serveur de développement

Pour démarrer le serveur Angular et accéder à l'application, exécutez : `npm start`


Cela lancera l'application Angular avec ouverture automatique dans le navigateur à l'adresse `http://localhost:4200/`.

Le serveur Angular utilise un fichier de configuration proxy (`src/proxy.conf.json`) pour rediriger les appels API vers le mock backend json-server.

---

## Lancer le backend mock json-server

Avant de lancer l'application, démarrez json-server afin de simuler l'API REST.

Si vous n'avez pas `json-server` installé globalement, installez-le : `npm install -g json-server`


Ensuite, à la racine du projet, lancez : `json-server --watch db.json --port 3000`


- `db.json` contient vos données mock (comptes, transactions, authentification, virements).

---

## Scripts disponibles (extraits de package.json)

- `npm start` : lance le serveur Angular avec configuration proxy.
- `npm run build` : construit le projet Angular pour la production.
- `npm run watch` : construit le projet en mode watch.
- `npm test` : lance les tests unitaires.
- `npm run serve:ssr:web_app_remit` : sert l'application Angular en mode SSR (server-side rendering).

---

## Architecture du projet

- Angular 17 avec standalone components.
- Utilisation des librairies `clsx` et `tailwind-merge` pour la gestion des classes CSS.
- Backend simulé avec json-server (mock API REST).
- Proxy Angular configuré pour masquer le port du backend et éviter les CORS.

---

## Dépendances principales

- Angular 17 (animations, common, forms, router...)
- rxjs
- clsx
- tailwind-merge
- express (pour serveur SSR)

---

## Configuration Proxy (./proxy.conf.json)