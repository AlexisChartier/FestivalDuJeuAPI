const express = require('express');
const { body, validationResult } = require('express-validator');
const PlageHoraireController = require('../controllers/PlageHoraireController');
const {validationErrorMessage} = require('../utils');

const router = express.Router();

const {authenticateAdmin, authenticateToken} = require('../middlewares');

// Validation rules for creating a plageHoraire
const createPlageHoraireValidationRules = [
  body('heureDebut').matches(/^\d{2}:\d{2}$/).withMessage('L\'heure de début doit être au format HH:MM'),
  body('heureFin').matches(/^\d{2}:\d{2}$/).withMessage('L\'heure de fin doit être au format HH:MM'),
  body('jour').isISO8601().withMessage('Le jour doit être une date valide (YYYY-MM-DD)'),
]

// Validation rules for updating a plageHoraire
const updatePlageHoraireValidationRules = [
  body('heureDebut').optional().matches(/^\d{2}:\d{2}$/).withMessage('L\'heure de début doit être au format HH:MM'),
  body('heureFin').optional().matches(/^\d{2}:\d{2}$/).withMessage('L\'heure de fin doit être au format HH:MM'),
  body('jour').optional().isISO8601().withMessage('Le jour doit être une date valide (YYYY-MM-DD)'),
]

// Routes

// Créer une nouvelle plageHoraire
// Requête POST avec un corps de requête contenant :
// {
//    "heureDebut": "08:00",
//    "heureFin": "10:00",
//    "jour": "2023-07-15"
// }
router.post('/plageshoraires', authenticateAdmin, createPlageHoraireValidationRules, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(validationErrorMessage(errors.array()));
  }
  PlageHoraireController.createPlageHoraire(req,res);
});

// Récupérer toutes les plagesHoraires
// Requête GET sans paramètre
router.get('/plageshoraires', authenticateToken, PlageHoraireController.getAllPlagesHoraires);

// Récupérer une plageHoraire
// Requête GET avec un paramètre 'id' (ex: /plagesHoraires/1)
router.get('/plageshoraires/:id', authenticateToken, PlageHoraireController.getPlageHoraire);

// Modifier une plageHoraire
// Requête PUT avec un paramètre 'id' (ex: /plagesHoraires/1)
// et un corps de requête contenant :
// {
//    "heureDebut": "08:00",
//    "heureFin": "10:00",
//    "jour": "2023-07-15"
// }
router.put('/plageshoraires/:id', authenticateAdmin, updatePlageHoraireValidationRules, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(validationErrorMessage(errors.array()));
  }
  PlageHoraireController.updatePlageHoraire(req,res);
});

// Récupérer les plages horaires d'un festival
// Requête GET avec un paramètre 'id' (ex: /plagesHoraires/festival/1)
router.get('/plageshoraires/festival/:id', authenticateToken, PlageHoraireController.getPlagesHorairesByFestival);


module.exports = router;