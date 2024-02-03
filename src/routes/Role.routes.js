const express = require('express');
const { body, validationResult } = require('express-validator');
const RoleController = require('../controllers/RoleController');
const {validationErrorMessage} = require('../utils');


const router = express.Router();

const {authenticateAdmin} = require('../middlewares');

// Validation rules for creating a role
const createRoleValidationRules = [
  body('nom').not().isEmpty().withMessage('Le nom est requis'),
];

// Routes

// Créer un nouveau rôle
// Requête POST avec un corps de requête contenant :
// {
//    "nom": "ADMIN",
// }
router.post('/roles', authenticateAdmin, createRoleValidationRules, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(validationErrorMessage(errors.array()));
  }
  RoleController.createRole(req,res);
});

// Récupérer tous les rôles
// Requête GET sans paramètre
router.get('/roles', RoleController.getAllRoles);

// Récupérer un rôle
// Requête GET avec un paramètre 'id' (ex: /roles/1)
router.get('/roles/:id', RoleController.getRole);

// Modifier un rôle
// Requête PUT avec un paramètre 'id' (ex: /roles/1)
router.put('/roles/:id', authenticateAdmin, RoleController.updateRole);


// Supprimer un rôle
// Requête DELETE avec un paramètre 'id' (ex: /roles/1)
router.delete('/roles/:id', authenticateAdmin, RoleController.deleteRole);

module.exports = router;



