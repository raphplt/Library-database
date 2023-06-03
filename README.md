# LIBRARY

Le projet consiste à concevoir et implémenter une base de données pour une bibliothèque afin d'améliorer leur gestion des livres, des auteurs, des membres et des prêts.

## Technologies

- Base de données MySQL
- Utilisation de Prisma comme ORM
- API réalisée en Typescript avec ExpressJS
- Frontend réalisé en NextJS/Typescript et Taiwind

## Installation

1. Tout d'abord, installez XAMPP et lancez les deux premiers services (Apache et MySQL).
2. Installez Prisma : `npm install prisma --save-dev`.
3. Accédez au dossier Prisma (`cd API/src/prisma`).
4. Pour lancer le schéma Prisma et créer les tables de la base de données, exécutez cette commande dans le dossier Prisma : `npx prisma migrate dev --name init`.

## Utilisation

- Pour lancer l'API :
  1. Accédez au dossier API (`cd API`) et exécutez la commande suivante : `npm start`.
- Pour lancer le Frontend :
  2. Accédez au dossier Frontend (`cd Frontend`) et exécutez la commande suivanteA : `npm run dev`.

## Prisma

Prisma est utilisé comme ORM (Object-Relational Mapping) dans notre application. 

En utilisant Prisma, on peut définir notre schéma de base de données dans un fichier `schema.prisma`, puis générer des modèles et des méthodes de requête TypeScript correspondants. Cela améliore la maintenabilité de la base de donnée et du code.

Les fonctionnalités de Prisma que nous utilisons dans cette application sont :

- Migrations de base de données : Prisma facilite la gestion des modifications de schéma de base de données avec des migrations automatisées. Nous pouvons définir les changements de schéma dans les fichiers de migration et les exécuter à l'aide de la commande `npx prisma migrate dev`.
- Génération de modèles : Prisma génère automatiquement des modèles TypeScript basés sur le schéma de base de données, ce qui nous permet d'accéder facilement aux tables et aux données.
- Requêtes de base de données : Prisma fournit une API fluide pour effectuer des requêtes de base de données à l'aide de méthodes générées automatiquement. Cela facilite la récupération et la manipulation des données dans notre application.

## Fonctionnalités

Notre application permet d'améliorer la gestion d'une bibliothèque en offrant des fonctionnalités telles que la gestion des livres, des auteurs, des membres et des prêts. Grâce à l'API et au frontend développés en Typescript et React, les utilisateurs peuvent effectuer diverses opérations, telles que l'ajout de nouveaux livres, la recherche d'ouvrages, la gestion des membres et la création de prêts.

L'utilisation de Prisma comme ORM nous permet de simplifier l'interaction avec la base de données et de gérer les opérations CRUD de manière efficace. Prisma génère du code TypeScript cohérent et sûr, ce qui facilite le développement et la maintenance de l'application.
## Auteurs

Chef de projet / Développeur Fullstack : PLASSART Raphaël.

Développeur Fullstack : AYMARD Lucas.

Développeur Backend : MOSBAH JOUNAYD