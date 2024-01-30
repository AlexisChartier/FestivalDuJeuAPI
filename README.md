# FestivalDuJeuAPI

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
