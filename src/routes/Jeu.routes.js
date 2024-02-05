const express = require('express');
const { body, validationResult } = require('express-validator');
const JeuController = require('../controllers/JeuController');
const {validationErrorMessage} = require('../utils');

const router = express.Router();

const fs = require('fs');
const csv = require('fast-csv');

const {authenticateAdmin, authenticateToken, upload} = require('../middlewares');

// Validation rules for creating a jeu
const createJeuValidationRules = [
  body('nom').not().isEmpty().withMessage('Le nom du jeu est requis'),
  body('auteur').optional().trim(),
  body('editeur').optional().trim(),
  body('nbJoueurs').optional().trim(),
  body('ageMin').optional().isInt({ min: 0 }).withMessage('L\'âge minimum doit être un nombre entier positif'),
  body('duree').optional().trim(),
  body('type').optional().trim(),
  body('notice').optional().trim(),
  body('aAnimer').optional().isBoolean().withMessage('Le champ "À animer" doit être un booléen'),
  body('recu').optional().isBoolean().withMessage('Le champ "Reçu" doit être un booléen'),
  body('mecanismes').optional().trim(),
  body('themes').optional().trim(),
  body('tags').optional().trim(),
  body('description').optional().trim(),
  body('image').optional().trim(),
  body('logo').optional().trim(),
  body('video').optional().trim(),
];

// Validation rules for updating a jeu
const updateJeuValidationRules = [
  body('nom').optional().not().isEmpty().withMessage('Le nom du jeu ne peut pas être vide'),
  body('auteur').optional().trim(),
  body('editeur').optional().trim(),
  body('nbJoueurs').optional().trim(),
  body('ageMin').optional().isInt({ min: 0 }).withMessage('L\'âge minimum doit être un nombre entier positif'),
  body('duree').optional().trim(),
  body('type').optional().trim(),
  body('notice').optional().trim(),
  body('aAnimer').optional().isBoolean().withMessage('Le champ "À animer" doit être un booléen'),
  body('recu').optional().isBoolean().withMessage('Le champ "Reçu" doit être un booléen'),
  body('mecanismes').optional().trim(),
  body('themes').optional().trim(),
  body('tags').optional().trim(),
  body('description').optional().trim(),
  body('image').optional().trim(),
  body('logo').optional().trim(),
  body('video').optional().trim(),
];

// Routes

// Créer un nouveau jeu
// Requête POST avec un corps de requête contenant :
// {
//    "nom": "Jeu de société",
//    "description": "Un jeu de société", ...
// }
router.post('/jeux', authenticateAdmin, createJeuValidationRules, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(validationErrorMessage(errors.array()));
  }
  JeuController.createJeu(req,res);
});

// Récupérer tous les jeux
// Requête GET sans paramètre
router.get('/jeux', JeuController.getAllJeux);

// Récupérer un jeu
// Requête GET avec un paramètre 'id' (ex: /jeux/1)
router.get('/jeux/:id', JeuController.getJeu);

// Modifier un jeu
// Requête PUT avec un paramètre 'id' (ex: /jeux/1)
router.put('/jeux/:id', authenticateAdmin, updateJeuValidationRules, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(validationErrorMessage(errors.array()));
  }
  JeuController.updateJeu(req,res);
});

// Supprimer un jeu
// Requête DELETE avec un paramètre 'id' (ex: /jeux/1)
router.delete('/jeux/:id', authenticateAdmin, JeuController.deleteJeu);

// Importer un fichier CSV de jeux et de zones
// Requête POST avec un corps de requête contenant un fichier CSV, l'idPoste et l'idFestival
// form-data : file: <file>, idPoste: <idPoste>, idFestival: <idFestival>
router.post('/jeux/import', authenticateAdmin, upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('Aucun fichier n\'a été téléchargé.');
    }
    if(!req.body.idPoste || !req.body.idFestival) {
      return res.status(400).send('L\'id du poste et l\'id du festival sont requis.');
    }


    const filePath = req.file.path;
    const stream = fs.createReadStream(filePath);
    const csvData = [];

    const csvStream = csv.parse({ headers: true, delimiter: ';' })
        .on('error', error => console.error(error))
        .on('data', row => csvData.push(row))
        .on('end', async () => {
            // Traitez ici les données CSV
            try {
                await JeuController.importCSV(csvData, req.body.idPoste, req.body.idFestival);
                // Supprimez le fichier après traitement
                fs.unlinkSync(filePath);
                return res.status(201).json({ message: 'Le fichier a été importé avec succès' });
            } catch (error) {
                return res.status(400).json({ error: error.message });
            }
        }
    );

    stream.pipe(csvStream);
});

// Récuperer les jeux d'une zone
// Requête GET avec un paramètre 'id' (ex: /jeux/zone/1)
router.get('/jeux/zone/:id', authenticateToken, JeuController.getJeuxByZone);


module.exports = router;
