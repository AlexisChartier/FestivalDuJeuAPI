const express = require('express');
const { body, validationResult } = require('express-validator');
const UserController = require('../controllers/UserController');

const router = express.Router();

const {authenticateToken} = require('../middlewares');

// Validation rules for creating a user
const createUserValidationRules = [
  body('pseudo').isLength({ min: 4, max: 30 }).withMessage('Le pseudo doit contenir entre 4 et 30 caractères'),
  body('nom').not().isEmpty().withMessage('Le nom est requis'),
  body('prenom').not().isEmpty().withMessage('Le prénom est requis'),
  body('mdp').isLength({ min: 6 }).matches(/\d/).withMessage('Le mot de passe doit contenir au moins 6 caractères et inclure un chiffre'),
  body('tailleTshirt').isIn(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']).withMessage('La taille du T-shirt doit être parmi XS, S, M, L, XL, XXL, XXXL'),
  body('vegetarien').isBoolean().withMessage('Le champ végétarien doit être un booléen'),
  body('hebergement').isBoolean().withMessage('Le champ hébergement doit être un booléen'),
  body('email').isEmail().withMessage('L\'email doit être valide'),
  body('tel').isLength({ min: 10, max: 10 }).withMessage('Le numéro de téléphone doit contenir 10 chiffres'),

];

// Validation rules for updating a user
const updateUserValidationRules = [
  body('nom').optional().not().isEmpty().withMessage('Le nom ne peut pas être vide'),
  body('prenom').optional().not().isEmpty().withMessage('Le prénom ne peut pas être vide'),
  body('tailleTshirt').optional().isIn(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']).withMessage('La taille du T-shirt doit être parmi XS, S, M, L, XL, XXL, XXXL'),
  body('vegetarien').optional().isBoolean().withMessage('Le champ végétarien doit être un booléen'),
  body('hebergement').optional().isBoolean().withMessage('Le champ hébergement doit être un booléen'),
  body('email').optional().isEmail().withMessage('L\'email doit être valide'),
  body('role').optional().isIn([1,2,3,4]).withMessage('Le rôle doit être parmi 0, 1, 2'),
  body('mdp').optional().isLength({ min: 6 }).matches(/\d/).withMessage('Le mot de passe doit contenir au moins 6 caractères et inclure un chiffre'),
];

// Validation rules for login
const loginValidationRules = [
  body('pseudo').isLength({ min: 4, max: 30 }).withMessage('Le pseudo doit contenir entre 4 et 30 caractères'),
  body('mdp').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères')
];

// Routes

// Créer un nouvel utilisateur
// Requête POST avec un corps de requête contenant :
// {
//    "pseudo": "user123",
//    "nom": "Doe",
//    "prenom": "John",
//    "mdp": "password123",
///    "tailleTshirt": "M",
//    "vegetarien": true,
//    "hebergement": false,
//   "email": "john.doe@gmailcom",
//   "tel": "0123456789"
// }
// Le role est mis par défaut à 2 (BENEVOLE)
// Le mot de passe est hashé avant d'être stocké en base de données
router.post('/users', createUserValidationRules, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  UserController.createUser(req, res);
});

// Récupérer tous les utilisateurs
// Requête GET sans paramètre
// Uniquement pour un admin
router.get('/users',authenticateToken, UserController.getAllUsers);

// Récupérer un utilisateur par son pseudo
// Requête GET avec un paramètre pseudo
// Uniquement pour un admin ou l'utilisateur concerné
router.get('/users/:pseudo',authenticateToken, UserController.getUserByPseudo);

// Vérifier si un pseudo est déjà utilisé
// Requête GET avec un paramètre pseudo
// Pour tout le monde
router.get('/users/check/:pseudo', UserController.checkIfUserExists);

// Vérifier les identifiants d'un utilisateur
// Requête POST avec un corps de requête contenant :  
// {
//    "pseudo": "user123",
//    "mdp": "password123"
// }
// Pour tout le monde
router.post('/users/login', loginValidationRules, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    UserController.login(req, res);
});

// Mettre à jour un utilisateur
// Requête PUT avec un paramètre pseudo et un corps de requête contenant :
// {
//    "pseudo": "user123",
//    "nom": "Doe",
//    "prenom": "John",
//    "mdp": "password123",
//    "tailleTshirt": "M",
//    "vegetarien": true,
//    "hebergement": false,
// }
// Uniquement pour un admin ou l'utilisateur concerné
router.put('/users/:pseudo',authenticateToken, updateUserValidationRules, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    UserController.updateUser(req, res);
});

// Supprimer un utilisateur
// Requête DELETE avec un paramètre pseudo
// Uniquement pour un admin ou l'utilisateur concerné
router.delete('/users/:pseudo',authenticateToken, UserController.deleteUser);

// Récupérer l'utilisateurs avec son role (useless ?)
//router.get('/users/:pseudo/role',authenticateToken, UserController.getUserWithRole);

module.exports = router;
