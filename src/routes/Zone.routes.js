const express = require('express');
const { body, validationResult } = require('express-validator');
const ZoneController = require('../controllers/ZoneController');
const {validationErrorMessage} = require('../utils');

const router = express.Router();

const {authenticateAdmin, authenticateToken, upload} = require('../middlewares');

// Validation rules for creating a zone 
const createZoneValidationRules = [
    body('nom').not().isEmpty().withMessage('Le nom de la zone est requis'),
    body('idPoste').not().isEmpty().withMessage('Le poste est requis'),
    body('idFestival').not().isEmpty().withMessage('Le festival est requis'),
]

// Validation rules for updating a zone
const updateZoneValidationRules = [
    body('nom').not().isEmpty().withMessage('Le nom de la zone ne peut pas être vide'),
]

// Routes

// Créer une nouvelle zone
// Requête POST avec un corps de requête contenant :
// {
//    "nom": "Zone 1",
//    "idPoste": 1,
//    "idFestival": 1
// }
router.post('/zones', authenticateAdmin, createZoneValidationRules, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(validationErrorMessage(errors.array()));
    }
    ZoneController.createZone(req,res);
});

// Récupérer toutes les zones
// Requête GET sans paramètre
router.get('/zones', authenticateToken, ZoneController.getAllZones);

// Récupérer une zone
// Requête GET avec un paramètre 'id' (ex: /zones/1)
router.get('/zones/:id', authenticateToken, ZoneController.getZone);

// Modifier une zone
// Requête PUT avec un paramètre 'id' (ex: /zones/1)
router.put('/zones/:id', authenticateAdmin, updateZoneValidationRules, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(validationErrorMessage(errors.array()));
    }
    ZoneController.updateZone(req,res);
});

// Supprimer une zone
// Requête DELETE avec un paramètre 'id' (ex: /zones/1)
router.delete('/zones/:id', authenticateAdmin, ZoneController.deleteZone);

// Récupérer les zones d'un poste
// Requête GET avec un paramètre 'id' (ex: /zones/poste/1)
router.get('/zones/poste/:id', authenticateToken, ZoneController.getZonesByPoste);

// Rechercher une zone d'un festival
// Requête GET avec un paramètre 'id' (ex: /zones/festival/1)
router.get('/zones/festival/:id', authenticateToken, ZoneController.getZonesByFestival);

module.exports = router;
