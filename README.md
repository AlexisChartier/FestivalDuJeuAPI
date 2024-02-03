# FestivalDuJeuAPI

## Menu

- [Technologies Utilisées](#technologies-utilisées)
- [Routes API](#routes-api)
  - [Users](#users)
  - [Roles](#roles)

## Technologies Utilisées

Le projet `FestivalDuJeuAPI` utilise les technologies et bibliothèques suivantes :

- **Node.js** : Environnement d'exécution JavaScript côté serveur.
- **Express** : Framework pour applications web Node.js.
- **MySQL** : Système de gestion de base de données relationnelle.
- **Sequelize** : ORM (Object-Relational Mapping) pour Node.js.
- **bcrypt** : Bibliothèque pour le hachage de mots de passe.
- **jsonwebtoken** : Implémentation des JSON Web Tokens pour l'authentification.
- **dotenv** : Module pour charger des variables d'environnement à partir de `.env`.
- **express-validator** : Middleware pour la validation des requêtes.
- **multer** : Middleware pour la gestion du téléchargement de fichiers, utilisé pour importer des fichiers CSV dans l'API.
- **fast-csv** : Bibliothèque pour le parsing et la manipulation de données CSV, permettant l'importation et la transformation des données de jeux et de zones à partir de fichiers CSV.

---
---

# Routes API

## Users

### Créer un Nouvel Utilisateur

- **Méthode HTTP :** `POST`
- **Endpoint :** `/festivaldujeu/api/users`
- **Autorisation :** Tous les utilisateurs
- **Body :**

    ```json
    {
        "pseudo": "user123",
        "nom": "Doe",
        "prenom": "John",
        "mdp": "password123",
        "tailleTshirt": "M",
        "vegetarien": true,
        "hebergement": false,
        "email": "john.doe@gmail.com",
        "tel": "0123456789"
    }
    ```

- **Réponse :** Un objet utilisateur créé (sans le mot de passe, l'email et le numéro de téléphone).

### Récupérer Tous les Utilisateurs

- **Méthode HTTP :** `GET`
- **Endpoint :** `/festivaldujeu/api/users`
- **Autorisation :** Admin
- **Réponse :** Liste de tous les utilisateurs.

### Récupérer un Utilisateur par Son Pseudo

- **Méthode HTTP :** `GET`
- **Endpoint :** `/festivaldujeu/api/users/:pseudo`
- **Autorisation :** Admin ou l'utilisateur concerné
- **Paramètre :** `pseudo` de l'utilisateur
- **Réponse :** Détails de l'utilisateur spécifié.

### Récupérer les Utilisateurs Proposant leur Hébergement

- **Méthode HTTP :** `GET`
- **Endpoint :** `/hebergement`
- **Autorisation :** Utilisateur connecté au niveau 2 (BÉNÉVOLE)
- **Description :** Récupère la liste des utilisateurs qui proposent leur hébergement. Cette route est accessible uniquement par les utilisateurs ayant un niveau d'accès de BÉNÉVOLE.
- **Réponse :** Retourne une liste d'utilisateurs proposant leur hébergement, incluant les détails nécessaires pour le contact.

### Vérifier si un Pseudo est Déjà Utilisé

- **Méthode HTTP :** `GET`
- **Endpoint :** `/festivaldujeu/api/users/check/:pseudo`
- **Autorisation :** Tous les utilisateurs
- **Paramètre :** `pseudo` à vérifier
- **Réponse :** `true` si le pseudo est utilisé, `false` sinon.

### Vérifier les Identifiants d'un Utilisateur (Login)

- **Méthode HTTP :** `POST`
- **Endpoint :** `/festivaldujeu/api/users/login`
- **Autorisation :** Tous les utilisateurs
- **Body :**

    ```json
    {
        "pseudo": "user123",
        "mdp": "password123"
    }
    ```

- **Réponse :** Token JWT si les identifiants sont corrects.

### Mettre à Jour un Utilisateur

- **Méthode HTTP :** `PUT`
- **Endpoint :** `/festivaldujeu/api/users/:pseudo`
- **Autorisation :** Admin ou l'utilisateur concerné
- **Body :** Champs de l'utilisateur à mettre à jour.
- **Paramètre :** `pseudo` de l'utilisateur à mettre à jour
- **Réponse :** Détails de l'utilisateur mis à jour.

### Supprimer un Utilisateur

- **Méthode HTTP :** `DELETE`
- **Endpoint :** `/festivaldujeu/api/users/:pseudo`
- **Autorisation :** Admin ou l'utilisateur concerné
- **Paramètre :** `pseudo` de l'utilisateur à supprimer
- **Réponse :** Message confirmant la suppression.

--- 

## Roles

### Créer un Nouveau Rôle

- **Méthode HTTP :** `POST`
- **Endpoint :** `/festivaldujeu/api/roles`
- **Autorisation :** Admin
- **Body :**

    ```json
    {
        "nom": "ADMIN"
    }
    ```

- **Description :** Crée un nouveau rôle avec le nom fourni.
- **Réponse :** Un objet rôle créé.

### Récupérer Tous les Rôles

- **Méthode HTTP :** `GET`
- **Endpoint :** `/festivaldujeu/api/roles`
- **Description :** Récupère une liste de tous les rôles.
- **Réponse :** Liste des rôles.

### Récupérer un Rôle

- **Méthode HTTP :** `GET`
- **Endpoint :** `/festivaldujeu/api/roles/:id`
- **Paramètre :** `id` du rôle
- **Description :** Récupère les détails d'un rôle spécifique.
- **Réponse :** Détails du rôle demandé.

### Modifier un Rôle

- **Méthode HTTP :** `PUT`
- **Endpoint :** `/festivaldujeu/api/roles/:id`
- **Autorisation :** Admin
- **Paramètre :** `id` du rôle à modifier
- **Body :** Données à mettre à jour pour le rôle.
- **Description :** Modifie les informations d'un rôle existant.
- **Réponse :** Détails du rôle mis à jour.

### Supprimer un Rôle

- **Méthode HTTP :** `DELETE`
- **Endpoint :** `/festivaldujeu/api/roles/:id`
- **Autorisation :** Admin
- **Paramètre :** `id` du rôle à supprimer
- **Description :** Supprime un rôle existant.
- **Réponse :** Confirmation de la suppression.

---

## Zones

### Créer une Nouvelle Zone

- **Méthode HTTP :** `POST`
- **Endpoint :** `/zones`
- **Autorisation :** Admin
- **Body :**

    ```json
    {
        "nom": "Zone 1",
        "idPoste": 1,
        "idFestival": 1
    }
    ```

- **Description :** Crée une nouvelle zone avec un nom, associée à un poste et à un festival spécifiques.

### Récupérer Toutes les Zones

- **Méthode HTTP :** `GET`
- **Endpoint :** `/zones`
- **Autorisation :** Token d'authentification requis
- **Description :** Récupère la liste de toutes les zones.

### Récupérer une Zone

- **Méthode HTTP :** `GET`
- **Endpoint :** `/zones/:id`
- **Autorisation :** Token d'authentification requis
- **Paramètre :** `id` de la zone
- **Description :** Récupère les détails d'une zone spécifique par son identifiant.

### Modifier une Zone

- **Méthode HTTP :** `PUT`
- **Endpoint :** `/zones/:id`
- **Autorisation :** Admin
- **Paramètre :** `id` de la zone à modifier
- **Body :** Données à mettre à jour pour la zone.

    ```json
    {
        "nom": "Zone mise à jour"
    }
    ```

- **Description :** Met à jour les informations d'une zone spécifique.

### Supprimer une Zone

- **Méthode HTTP :** `DELETE`
- **Endpoint :** `/zones/:id`
- **Autorisation :** Admin
- **Paramètre :** `id` de la zone à supprimer
- **Description :** Supprime une zone spécifique par son identifiant.

### Récupérer les Zones d'un Poste

- **Méthode HTTP :** `GET`
- **Endpoint :** `/zones/poste/:id`
- **Autorisation :** Token d'authentification requis
- **Paramètre :** `id` du poste
- **Description :** Récupère les zones associées à un poste spécifique.

### Rechercher une Zone d'un Festival

- **Méthode HTTP :** `GET`
- **Endpoint :** `/zones/festival/:id`
- **Autorisation :** Token d'authentification requis
- **Paramètre :** `id` du festival
- **Description :** Récupère les zones associées à un festival spécifique.

## Jeux

### Créer un Nouveau Jeu

- **Méthode HTTP :** `POST`
- **Endpoint :** `/jeux`
- **Autorisation :** Admin
- **Body :**

    ```json
    {
        "nom": "Jeu de société",
        "description": "Un jeu de société", ...
    }
    ```

- **Description :** Permet de créer un nouveau jeu avec les informations fournies dans le corps de la requête.

### Récupérer Tous les Jeux

- **Méthode HTTP :** `GET`
- **Endpoint :** `/jeux`
- **Description :** Récupère une liste de tous les jeux disponibles.

### Récupérer un Jeu Spécifique

- **Méthode HTTP :** `GET`
- **Endpoint :** `/jeux/:id`
- **Paramètre :** `id` du jeu
- **Description :** Récupère les détails d'un jeu spécifique par son identifiant.

### Modifier un Jeu

- **Méthode HTTP :** `PUT`
- **Endpoint :** `/jeux/:id`
- **Autorisation :** Admin
- **Paramètre :** `id` du jeu à modifier
- **Body :** Données à mettre à jour pour le jeu.
- **Description :** Permet de mettre à jour les informations d'un jeu spécifique.

### Supprimer un Jeu

- **Méthode HTTP :** `DELETE`
- **Endpoint :** `/jeux/:id`
- **Autorisation :** Admin
- **Paramètre :** `id` du jeu à supprimer
- **Description :** Supprime un jeu spécifique par son identifiant.

### Importer un Fichier CSV de Jeux et de Zones

- **Méthode HTTP :** `POST`
- **Endpoint :** `/jeux/import`
- **Autorisation :** Admin
- **Form-data :**
  - `file`: Fichier CSV à importer
  - `idPoste`: Identifiant du poste
  - `idFestival`: Identifiant du festival
- **Description :** Importe un fichier CSV contenant les informations des jeux et potentiellement des zones associées.

### Récupérer les Jeux d'une Zone

- **Méthode HTTP :** `GET`
- **Endpoint :** `/jeux/zone/:id`
- **Autorisation :** Token d'authentification requis
- **Paramètre :** `id` de la zone
- **Description :** Récupère les jeux associés à une zone spécifique.

## Postes

### Créer un Nouveau Poste

- **Méthode HTTP :** `POST`
- **Endpoint :** `/postes`
- **Autorisation :** Admin
- **Body :**

    ```json
    {
        "nom": "Buvette",
        "details": "Vente de boissons",
        "pseudoReferent": "user123"
    }
    ```

- **Description :** Permet de créer un nouveau poste avec un nom, des détails et un référent spécifiés.

### Récupérer Tous les Postes

- **Méthode HTTP :** `GET`
- **Endpoint :** `/postes`
- **Autorisation :** Token d'authentification requis
- **Description :** Récupère une liste de tous les postes disponibles.

### Récupérer un Poste Spécifique

- **Méthode HTTP :** `GET`
- **Endpoint :** `/postes/:id`
- **Autorisation :** Token d'authentification requis
- **Paramètre :** `id` du poste
- **Description :** Récupère les détails d'un poste spécifique par son identifiant.

### Modifier un Poste

- **Méthode HTTP :** `PUT`
- **Endpoint :** `/postes/:id`
- **Autorisation :** Admin
- **Paramètre :** `id` du poste à modifier
- **Body :** Données à mettre à jour pour le poste.
- **Description :** Permet de mettre à jour les informations d'un poste spécifique.

### Supprimer un Poste

- **Méthode HTTP :** `DELETE`
- **Endpoint :** `/postes/:id`
- **Autorisation :** Admin
- **Paramètre :** `id` du poste à supprimer
- **Description :** Supprime un poste spécifique par son identifiant.

### Récupérer les Postes d'un Festival

- **Méthode HTTP :** `GET`
- **Endpoint :** `/postes/festival/:id`
- **Autorisation :** Token d'authentification requis
- **Paramètre :** `id` du festival
- **Description :** Récupère les postes associés à un festival spécifique.
