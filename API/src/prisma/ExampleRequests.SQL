-- Création de la table Book
CREATE TABLE `Book` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `genre` JSON,
  `title` VARCHAR(255) NOT NULL,
  `author` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `publishedAt` DATETIME NOT NULL,
  `publisher` VARCHAR(255) NOT NULL,
  `isAvailable` BOOLEAN NOT NULL,
  `dateLeave` DATETIME,
  `dateReturn` DATETIME,
  `idUserHasBook` INT,
  `isbn` INT UNIQUE NOT NULL,
  `createdAt` DATETIME,
  `lastModified` DATETIME,
  `image` VARCHAR(255)
);

-- Création de la table User
CREATE TABLE `User` (
  `id` INT AUTO_INCREMENT PRIMARY KEY, 
  `role` VARCHAR(255) NOT NULL,
  `firstName` VARCHAR(255) NOT NULL,
  `lastName` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `phone` INT,
  `password` VARCHAR(255) NOT NULL,
  `endSubscription` DATETIME,
  `currentsBooks` JSON,
  `contractStart` DATETIME,
  `contractEnd` DATETIME,
  `subscriber` BOOLEAN,
  `salary` DECIMAL(10, 2),
  `createdAt` DATETIME,
  `lastModified` DATETIME
);

-- Ajout de la clefs étrangère sur l'idUser et idUserHasBook de la table Book
ALTER TABLE Book
ADD CONSTRAINT FK_Book_User
FOREIGN KEY (idUserHasBook) REFERENCES User(id);

-- Exemple de Select pour naviguer dans la base de donnée
SELECT * FROM `User`;
SELECT * From `Book` WHERE author = 'Tite Kubo';
SELECT * FROM `Book` WHERE isbn LIKE '56%';
SELECT * From `Book` INNER JOIN `User` WHERE `idUserHasBook` = User.id

-- Exemple d'ajout d'un User dans la table Usercertaines valeurs n'ont pas été remplit car elles sont nullable
INSERT INTO User (role, firstName, lastName, email, phone, password, endSubscription, currentsBooks, contractStart, contractEnd, subscriber, salary, createdAt, lastModified)
VALUES ('user', 'John', 'Doe', 'john.doe@example.com', 123456789, 'password', NULL, '[1, 2]', '2023-01-01', '2023-12-31', TRUE, 50000.00, NOW(), NOW());

-- Exemple d'ajout d'un livres dans la table Book certaines valeurs n'ont pas été remplit car elles sont nullable
INSERT INTO Book (genre, title, author, description, publishedAt, publisher, isAvailable, isbn)
VALUES ('{"genre": "Manga", "subgenre": "Shonen"}', 'Fullmetal Alchemist', 'Hiromu Arakawa', 'Deux frères alchimistes partent en quête de la Pierre Philosophale pour retrouver leurs corps.', '2001-07-12', 'Square Enix', true, 5671234);

-- Exemple d'update de la table User via l'id unique pour ne pas se tromper de ligne
UPDATE `User` SET `firstName` = 'Changement du nom' WHERE id = '1';

-- Exemple d'update de la table Book via l'id unique pour ne pas se tromper de ligne
UPDATE `Book` SET `title` = 'Changement du titre' WHERE id = '1';

--Exemple de Suppresion de la table Book
DROP TABLE `Book`

--Exemple de Suppresion de la table User
DROP TABLE `User`

--Exemple de Update sur la table Book via l'id unique pour ne pas se tromper de ligne
update `Book` set id = '200' where id ='1';

--Exemple de Update sur la table User via l'id unique pour ne pas se tromper de ligne
update `User` set id = '200' where id ='1';

--Exemple de Suppresion d'une ligne de la table Book via l'id unique pour ne pas se tromper de ligne
DELETE FROM `User` WHERE id = 1;

--Exemple de Suppresion d'une ligne de la table Book via l'id unique pour ne pas se tromper de ligne
DELETE FROM `Book` WHERE id = 1;
