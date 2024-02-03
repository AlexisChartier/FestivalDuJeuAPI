const express = require('express');
const { body, validationResult } = require('express-validator');
const InscriptionController = require('../controllers/InscriptionController');
const {validationErrorMessage} = require('../utils');

const router = express.Router();

const {authenticateAdmin, authenticateToken} = require('../middlewares');

// Validation rules for creating a inscription de poste
const createInscriptionPosteValidationRules = [
  // Validation du body comme tableau
  body().isArray().withMessage('Le corps de la requête doit être un tableau.'),
  
  // Validation pour chaque élément du tableau
  body('*.idCreneauPoste').isInt({ gt: 0 }).withMessage('L\'idCreneauPoste doit être un entier positif.'),
  body('*.pseudo').trim().isLength({ min: 1 }).withMessage('Le pseudo est requis et ne peut pas être vide.'),
];

// Validation rules for creating a inscription de zone
const createInscriptionZoneValidationRules = [
  // Validation du body comme tableau
  body().isArray().withMessage('Le corps de la requête doit être un tableau.'),
  
  // Validation pour chaque élément du tableau
  body('*.idCreneauZone').isInt({ gt: 0 }).withMessage('L\'idCreneauZone doit être un entier positif.'),
  body('*.pseudo').trim().isLength({ min: 1 }).withMessage('Le pseudo est requis et ne peut pas être vide.'),
];


//Routes 

// Créer des nouvelles inscriptions de poste 
// Requête POST avec un body JSON
// [{
//  "idCreneauPoste": 1,
//  "pseudo": "user123",}
// ...]
// Retourne les inscriptions de poste créé
router.post('/inscriptions/poste', authenticateToken, createInscriptionPosteValidationRules, (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(validationErrorMessage(errors.array()));
    }
    InscriptionController.inscrirePoste(req,res);
});

// Créer des nouvelles inscriptions de zone
// Requête POST avec un body JSON
// [{
//  "idCreneauZone": 1,
//  "pseudo": "user123",}
// ...]
// Retourne les inscriptions de zone créé
router.post('/inscriptions/zone', authenticateToken,createInscriptionZoneValidationRules, (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(validationErrorMessage(errors.array()));
    }
    InscriptionController.inscrireZone(req,res);
});

// Récupérer les créneaux de poste d'un utilisateur pour un festival
// Requête GET avec un paramètre 'idFestival' et 'pseudo' (ex: /inscriptions/postes/festival/1/pseudo)
// Retourne un tableau de créneaux de poste
router.get('/inscriptions/postes/festival/:idFestival/:pseudo', authenticateToken, InscriptionController.getInscriptionsPosteByFestivalByUser);

// Récupérer les créneaux de zone d'un utilisateur pour un festival
// Requête GET avec un paramètre 'idFestival' et 'pseudo' (ex: /inscriptions/zones/festival/1/pseudo)
// Retourne un tableau de créneaux de zone
router.get('/inscriptions/zones/festival/:idFestival/:pseudo', authenticateToken, InscriptionController.getInscriptionsZoneByFestivalByUser);



module.exports = router;