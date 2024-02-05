const express = require('express');
const { body, validationResult } = require('express-validator');
const CreneauController = require('../controllers/CreneauController');
const {validationErrorMessage} = require('../utils');

const router = express.Router();

const {authenticateAdmin, authenticateToken} = require('../middlewares');

// Validation pour la création de créneaux de poste
const validateCreateCreneauxPoste = [
    // Le body doit etre un tableaua
    body().isArray().withMessage('Le body doit être un tableau'),
    body('*.idPoste').isInt({ min: 1 }).withMessage('L\'idPoste doit être un entier positif'),
    body('*.plageHoraire').isInt({ min: 1 }).withMessage('La plageHoraire doit être un entier positif'),
    body('*.nombreMax').isInt({ min: 1 }).withMessage('Le nombreMax doit être un entier positif'),
];

// Validation pour la création de créneaux de zone
const validateCreateCreneauxZone = [
    body().isArray().withMessage('Le body doit être un tableau'),
    body('*.idZone').isInt({ min: 1 }).withMessage('L\'idZone doit être un entier positif'),
    body('*.plageHoraire').isInt({ min: 1 }).withMessage('La plageHoraire doit être un entier positif'),
    body('*.nombreMax').isInt({ min: 1 }).withMessage('Le nombreMax doit être un entier positif'),
];

// Validation pour la modification d'un créneau
const validateUpdateCreneau = [
    body('nombreMax').isInt({ min: 1 }).withMessage('Le nombreMax doit être un entier positif'),
];


// Routes

// Récupérer tous les créneaux de poste
// Requête GET sans paramètre
// Retourne un tableau de créneaux de poste
router.get('/creneaux/poste', CreneauController.getAllCreneauxPoste);

// Récupérer tous les créneaux de zone
// Requête GET sans paramètre
// Retourne un tableau de créneaux de zone
router.get('/creneaux/zone', CreneauController.getAllCreneauxZone);

// Récupérer les créneaux d'un poste
// Requête GET avec un paramètre 'id' (ex: /creneaux/poste/1)
// Retourne un tableau de créneaux de poste
router.get('/creneaux/poste/:id', CreneauController.getCreneauxPoste);

// Récupérer les créneaux d'une zone
// Requête GET avec un paramètre 'id' (ex: /creneaux/zone/1)
// Retourne un tableau de créneaux de zone
router.get('/creneaux/zone/:id', CreneauController.getCreneauxZone);



// Créer des créneaux de poste
// Requête POST avec un body JSON
// [{
//  "idPoste": 1,
//  "plageHoraire": 1,
//  "nombreMax": 10
// },
// ...]
// Retourne les créneaux de poste créé
router.post('/creneaux/poste', authenticateAdmin, validateCreateCreneauxPoste,(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(validationErrorMessage(errors.array()));
    }
    CreneauController.createCreneauxPoste(req,res);
});

// Créer des créneaux de zone
// Requête POST avec un body JSON
// [{
//  "idZone": 1,
//  "plageHoraire": 1,
//  "nombreMax": 10
// },
// ...]
// Retourne les créneaux de zone créé
router.post('/creneaux/zone', authenticateAdmin, validateCreateCreneauxZone,(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(validationErrorMessage(errors.array()));
    }
    CreneauController.createCreneauxZone(req,res);
});

//Modifier un créneau de poste
// Requête PUT avec un paramètre 'id' (ex: /creneaux/poste/1)
// body : { "nombreMax": 10 }
router.put('/creneaux/poste/:id', authenticateAdmin, validateUpdateCreneau, (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(validationErrorMessage(errors.array()));
    }
    CreneauController.updateCreneauPoste(req,res);
});

//Modifier un créneau de zone
// Requête PUT avec un paramètre 'id' (ex: /creneaux/zone/1)
// body : { "nombreMax": 10 }
router.put('/creneaux/zone/:id', authenticateAdmin, validateUpdateCreneau, (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(validationErrorMessage(errors.array()));
    }
    CreneauController.updateCreneauZone(req,res);
});

// Supprimer un créneau de poste
// Requête DELETE avec un paramètre 'id' (ex: /creneaux/poste/1)
// Retourne un message de confirmation
router.delete('/creneaux/poste/:id', authenticateAdmin, CreneauController.deleteCreneauPoste);

// Supprimer un créneau de zone
// Requête DELETE avec un paramètre 'id' (ex: /creneaux/zone/1)
// Retourne un message de confirmation
router.delete('/creneaux/zone/:id', authenticateAdmin, CreneauController.deleteCreneauZone);




module.exports = router;



