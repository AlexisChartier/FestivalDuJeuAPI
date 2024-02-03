const express = require('express');
const { body, validationResult } = require('express-validator');
const FestivalController = require('../controllers/FestivalController');
const {validationErrorMessage} = require('../utils');

const router = express.Router();

const {authenticateAdmin, authenticateToken} = require('../middlewares');

// Validation rules for creating a festival
const createfestivalValidationRules = [
  // Validation du nom du festival
  body('nom').not().isEmpty().withMessage('Le nom du festival est requis'),

  // Validation des dates de début et de fin
  body('dateDebut').isISO8601().withMessage('La date de début doit être une date valide (YYYY-MM-DD)'),
  body('dateFin').isISO8601().withMessage('La date de fin doit être une date valide (YYYY-MM-DD)'),

  // Validation des plages horaires
  body('plageHoraires').isArray().withMessage('Les plages horaires doivent être un tableau'),
  body('plageHoraires.*.heureDebut').matches(/^\d{2}:\d{2}$/).withMessage('L\'heure de début doit être au format HH:MM'),
  body('plageHoraires.*.heureFin').matches(/^\d{2}:\d{2}$/).withMessage('L\'heure de fin doit être au format HH:MM'),
  body('plageHoraires.*.jour').isISO8601().withMessage('Le jour doit être une date valide (YYYY-MM-DD)'),

  // Validation des postes
  body('postes').isArray().withMessage('Les postes doivent être un tableau'),
  body('postes.*.idPoste').optional().isInt({ min: 1 }).withMessage('L\'idPoste doit être un entier positif'),
  body('postes.*.nom').optional().not().isEmpty().withMessage('Le nom du poste est requis pour les nouveaux postes'),
  body('postes.*.details').optional().not().isEmpty().withMessage('Les détails du poste sont requis pour les nouveaux postes'),
  body('postes.*.pseudoReferent').optional().not().isEmpty().withMessage('Le pseudo du référent est requis pour les nouveaux postes'),
];

// Validation rules for updating a festival
const updateFestivalValidationRules = [
  body('nom').optional().not().isEmpty().withMessage('Le nom du festival ne peut pas être vide'),
  body('dateDebut').optional().not().isEmpty().withMessage('La date de début du festival est requise'),
  body('dateFin').optional().not().isEmpty().withMessage('La date de fin du festival est requise'),
]

// Routes

// Créer un nouveau festival
// Requête POST avec un corps de requête contenant :
/**
 * {
  "nom": "Festival du Jour Unique",
  "dateDebut": "2023-07-15",
  "dateFin": "2023-07-15",
  "plageHoraires": [
    {
      "heureDebut": "08:00",
      "heureFin": "10:00",
      "jour": "2023-07-15"
    },
    {
      "heureDebut": "10:00",
      "heureFin": "12:00",
      "jour": "2023-07-15"
    },
    {
      "heureDebut": "12:00",
      "heureFin": "14:00",
      "jour": "2023-07-15"
    },
    {
      "heureDebut": "14:00",
      "heureFin": "16:00",
      "jour": "2023-07-15"
    },
    {
      "heureDebut": "16:00",
      "heureFin": "18:00",
      "jour": "2023-07-15"
    }
  ],
  "postes": [
    {
      "idPoste": 1
    },
    {
      "nom": "Buvette",
      "details": "Vente de boissons et snacks",
      "pseudoReferent": "userBuvette"
    },
    {
      "nom": "Accueil",
      "details": "Accueil des visiteurs et information",
      "pseudoReferent": "userAccueil"
    }
  ]
}
*/
router.post('/festivals', authenticateAdmin, createfestivalValidationRules, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(validationErrorMessage(errors.array()));
    }
    FestivalController.createFestival(req,res);
});

// Récupérer tous les festivals
// Requête GET sans paramètre
router.get('/festivals', authenticateToken, FestivalController.getAllFestivals);

// Récupérer un festival
// Requête GET avec un paramètre 'id' (ex: /festivals/1)
router.get('/festivals/:id', authenticateToken, FestivalController.getFestival);

// Modifier un festival
// Requête PUT avec un paramètre 'id' (ex: /festivals/1)
// Contient un corps de requête avec les champs à modifier
// {
//    "nom": "Festival de l'été",
//    "dateDebut": "2021-06-01",
//    "dateFin": "2021-06-05",
// }
router.put('/festivals/:id', authenticateAdmin,updateFestivalValidationRules, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(validationErrorMessage(errors.array()));
    }
    FestivalController.updateFestival(req,res);
});

// Supprimer un festival
// Requête DELETE avec un paramètre 'id' (ex: /festivals/1)
router.delete('/festivals/:id', authenticateAdmin, FestivalController.deleteFestival);

// Savoir si l'utilisateur en cours est inscrit à un festival en cours 
// Requête GET avec un paramètre 'id' (ex: /festivals/1/inscription)
router.get('/festivals/inscription', authenticateToken, FestivalController.isRegistered);

// S'inscrire à un festival
// Requête POST avec un body contenant un idFestival
router.post('/festivals/inscription', authenticateToken, FestivalController.register);





module.exports = router;