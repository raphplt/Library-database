D'abord, installer XAMPP, et lancer les deux premiers Services (Apache et MYSQL)
Installer aussi Prisma : npm install prisma --save-dev

Aller dans le dossier DB (cd DB)
Puis executer cette commande sur un terminal : npx prisma migrate dev --name init