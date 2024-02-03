const express = require('express');
const { body, validationResult } = require('express-validator');
const PosteController = require('../controllers/PosteController');
const {validationErrorMessage} = require('../utils');

const router = express.Router();

const {authenticateAdmin, authenticateToken} = require('../middlewares');

// Validation rules for creating a poste
const createPosteValidationRules = [
  body('nom').not().isEmpty().withMessage('Le nom du poste est requis'),
  body('details').not().isEmpty().withMessage('Le festival est requis'),
  body('pseudoReferent').not().isEmpty().withMessage('Le pseudo du referent est requis'),
]

// Validation rules for updating a poste
const updatePosteValidationRules = [
  body('nom').optional().not().isEmpty().withMessage('Le nom du poste ne peut pas être vide'),
  body('details').optional().not().isEmpty().withMessage('Le festival est requis'),
  body('pseudoReferent').optional().not().isEmpty().withMessage('Le pseudo du referent est requis'),
]

// Routes

// Créer un nouveau poste
// Requête POST avec un corps de requête contenant :
// {
//    "nom": "Buvette",
//    "details": "Vente de boissons",
//    "pseudoReferent": "user123"
// }
router.post('/postes', authenticateAdmin, createPosteValidationRules, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(validationErrorMessage(errors.array()));
  }
  PosteController.createPoste(req,res);
});

// Récupérer tous les postes
// Requête GET sans paramètre
router.get('/postes', authenticateToken, PosteController.getAllPostes);

// Récupérer un poste
// Requête GET avec un paramètre 'id' (ex: /postes/1)
router.get('/postes/:id', authenticateToken, PosteController.getPoste);

// Modifier un poste
// Requête PUT avec un paramètre 'id' (ex: /postes/1)
router.put('/postes/:id', authenticateAdmin, updatePosteValidationRules, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(validationErrorMessage(errors.array()));
  }
  PosteController.updatePoste(req,res);
});

// Supprimer un poste
// Requête DELETE avec un paramètre 'id' (ex: /postes/1)
router.delete('/postes/:id', authenticateAdmin, PosteController.deletePoste);

// Récupérer les postes d'un festival
// Requête GET avec un paramètre 'id' (ex: /postes/festival/1)
router.get('/postes/festival/:id', authenticateToken, PosteController.getPostesByFestival);

// Récupérer le référent d'un poste
// Requête GET avec un paramètre 'id' (ex: /postes/1/referent)
router.get('/postes/:id/referent', authenticateToken, PosteController.getReferentByPoste);


module.exports = router;
