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
