const db = require('../models'); 
const utils = require('../utils');

const Jeu = db.Jeu;
const Zone = db.Zone;
const JeuZone = db.JeuZone;

const JeuController = {
    
    /**
    * Récupérer tous les jeux
    * Requête GET sans paramètre
    * Retourne un tableau de jeux
    */
    async getAllJeux(req,res){
        try{
            const jeux = await Jeu.findAll();
            return res.status(200).json(jeux);
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Récupérer un jeu
    * Requête GET avec un paramètre 'id' (ex: /jeux/1)
    * Retourne un jeu
    */
    async getJeu(req,res){
        try{
            const jeu = await Jeu.findByPk(req.params.id);
            if(jeu){
                return res.status(200).json(jeu);
            }else{
                return res.status(404).json({ error: "Ce jeu n'existe pas" });
            }
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Créer un nouveau jeu
    * Requête POST avec un corps de requête contenant :
    * {
    *    "nom": "Jeu de société",
    *    "description": "Un jeu de société",
    *    "nombreJoueurs": 4,
    *    "duree": 60,
    *    "categorie": "Société",
    *    "materiel": "Un plateau, des pions, des cartes",
    *    "regles": "Les règles du jeu"
    * }
    */
    async createJeu(req, res) {
        // Vérifier que l'utilisateur est un admin
        if(!utils.isAdmin(req)){
            return res.status(403).json({ error: "Vous n'êtes pas autorisé à effectuer cette action" });
        }
        // Get the latest id from the database and increment it by 1
        const latestJeu = await Jeu.findOne({ order: [ [ 'idJeu', 'DESC' ]] });
        if(latestJeu){
            req.body.idJeu = latestJeu.idJeu + 1;
        }else{
            req.body.idJeu = 1;
        }
        try {
            let newJeu = await Jeu.create(req.body);
            newJeu = newJeu.get({ plain: true })
            return res.status(201).json(newJeu);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Supprimer un jeu
    * Requête DELETE avec un paramètre 'id' (ex: /jeux/1)
    * Retourne un message de confirmation
    */
    async deleteJeu(req,res){
        // Vérifier que l'utilisateur est un admin
        if(!utils.isAdmin(req)){
            return res.status(403).json({ error: "Vous n'êtes pas autorisé à effectuer cette action" });
        }
        try{
            const jeu = await Jeu.findByPk(req.params.id);
            if(jeu){
                await jeu.destroy();
                return res.status(200).json({ message: "Le jeu a bien été supprimé" });
            }
            return res.status(404).json({ error: "Ce jeu n'existe pas" });
        }
        catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /** 
     * Mettre à jour un jeu
     * Requête PUT avec un paramètre 'id' (ex: /jeux/1)
     * et un corps de requête contenant :
     * {
     *   "nom": "Jeu de société",
     *  "description": "Un jeu de société",
     * "nombreJoueurs": 4,
     * }
     * 
     */
    async updateJeu(req,res){
        // Vérifier que l'utilisateur est un admin
        if(!utils.isAdmin(req)){
            return res.status(403).json({ error: "Vous n'êtes pas autorisé à effectuer cette action" });
        }
        try{
            const jeu = await Jeu.findByPk(req.params.id);
            if(jeu){
                await jeu.update(req.body);
                return res.status(200).json(jeu);
            }
            return res.status(404).json({ error: "Ce jeu n'existe pas" });
        }
        catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /** 
     * Importer un fichier CSV de jeux et de zones
     * Requête POST avec un corps de requête contenant un fichier CSV et les idPoste et idFestival
     * form-data : file: <file>, idPoste: <idPoste>, idFestival: <idFestival>
     * Uniquement pour un admin
     */
    async importCSV(csvData,idFestival,idPoste){
        //le fichier doit contenir les colonnes suivantes :
        //idJeu;Nom du jeu;Auteur;Éditeur;nb joueurs;âge min;Durée;Type;Notice;Zone plan;Zone bénévole;idZone;À animer;Reçu;Mécanismes;Thèmes;Tags;Description;Image;Logo;Vidéo
        // csvData est un tableau d'objet (1 objet par ligne du fichier CSV)
        // Chaque objet contient les colonnes du fichier CSV
        // Par exemple :
        // [
        //     { idJeu: '1', 'Nom du jeu': 'Jeu de société', Auteur: 'John Doe', Éditeur: 'Doe', 'nb joueurs': '4', 'âge min': '8', Durée: '60', Type: 'Société', Notice: 'Les règles du jeu', 'Zone plan': 'Zone 1', 'Zone bénévole': 'Zone 2', idZone: '1', 'À animer': 'true', Reçu: 'true', Mécanismes: 'Mécanisme 1, Mécanisme 2', Thèmes: 'Thème 1, Thème 2', Tags: 'Tag 1, Tag 2', Description: 'Description du jeu', Image: 'image.jpg', Logo: 'logo.jpg', Vidéo: 'video.mp4' },
        //     { idJeu: '2', 'Nom du jeu': 'Jeu de cartes', Auteur: 'Jane Doe', Éditeur: 'Doe', 'nb joueurs': '2', 'âge min': '6', Durée: '30', Type: 'Cartes', Notice: 'Les règles du jeu', 'Zone plan': 'Zone 1', 'Zone bénévole': 'Zone 2', idZone: '1', 'À animer': 'true', Reçu: 'true', Mécanismes: 'Mécanisme 1, Mécanisme 2', Thèmes: 'Thème 1, Thème 2', Tags: 'Tag 1, Tag 2', Description: 'Description du jeu', Image: 'image.jpg', Logo: 'logo.jpg', Vidéo: 'video.mp4' }
        // ]
        // Récuperer les noms des colonnes du fichier CSV
        
        // Pour chaque ligne du fichier CSV
        // Vérifier les données
        try {
            csvData.forEach(async (row) => {
                // Converssion des données pour les adapter à la base de données
                // Convertir les valeurs des colonnes 'À animer' et 'Reçu' en booléens (true ou false) sachant que leur valeur est "oui" ou "non"
                if(row['À animer'] === "oui" || row['À animer'] === "non") row['À animer'] = row['À animer'] === "oui";
                if (row.Reçu === "oui" || row.Reçu === "non") row.Reçu = row.Reçu === "oui";
                // Convertir le age min en nombre entier sachant qu'il est au format "8 ans"
                if(row['âge min'] !== "")  row['âge min'] = parseInt(row['âge min'].split(' ')[0]); 
                else row['âge min'] = 0;
                // Convertir le nb joueurs en nombre entier sachant qu'il est au format "1 joueurs" ou "1 à 2 joueurs" (dans le cas où il y a un intervalle de joueurs prendre la valeur la plus grande)
                // Utiliser une expression régulière pour récupérer le ou les nombres
                if(row['nb joueurs'] !== "") {
                    let nbJoueurs = row['nb joueurs'];
                    let match = nbJoueurs.match(/\d+/g);
                    if(match){
                        nbJoueurs = Math.max(...match);
                    }
                    row['nb joueurs'] = parseInt(nbJoueurs);
                } else {
                    row['nb joueurs'] = 0;
                }

                // Vérification des données 
                // Si le nombre de joueurs est un nombre entier négatif, le mettre à 0
                if(row['nb joueurs'] < 0){
                    row['nb joueurs'] = 0;
                }
                // Si l'âge minimum est un nombre entier négatif, le mettre à 0
                if(row['âge min'] < 0){
                    row['âge min'] = 0;
                }

                // Si le lien de l'image est trop long (plus de 255 caractères), le raccourcir en enlevant les paramètres de la requête
                if(row.Image.length > 255){
                    row.Image = row.Image.split('?')[0];
                }
                // Si le lien du logo est trop long (plus de 255 caractères), le raccourcir en enlevant les paramètres de la requête
                if(row.Logo.length > 255){
                    row.Logo = row.Logo.split('?')[0];
                }
                // Si le lien de la vidéo est trop long (plus de 255 caractères), le raccourcir en enlevant les paramètres de la requête
                if(row.Vidéo.length > 255){
                    row.Vidéo = row.Vidéo.split('?')[0];
                }
        
                // Si le lien de la notice est trop long (plus de 255 caractères), le raccourcir en enlevant les paramètres de la requête
                if(row.Notice.length > 255){
                    row.Notice = row.Notice.split('?')[0];
                }

                // Créer le jeu si il n'existe pas
                Jeu.findOrCreate({
                    where: { idJeu: row.idJeu },
                    defaults: {
                        idJeu: row.idJeu,
                        nom: row['Nom du jeu'],
                        auteur: row.Auteur,
                        editeur: row.Éditeur,
                        nbJoueurs: row['nb joueurs'],
                        ageMin: row['âge min'],
                        duree: row.Durée,
                        type: row.Type,
                        notice: row.Notice,
                        mecanismes: row.Mécanismes,
                        themes: row.Thèmes,
                        tags: row.Tags,
                        description: row.Description,
                        image: row.Image,
                        logo: row.Logo,
                        video: row.Vidéo
                    }
                }).then(([jeu, created]) => {
                    // Mettre à jour les champs de la table Jeu
                    jeu.update({
                        nom: row['Nom du jeu'],
                        auteur: row.Auteur,
                        editeur: row.Éditeur,
                        nbJoueurs: row['nb joueurs'],
                        ageMin: row['âge min'],
                        duree: row.Durée,
                        type: row.Type,
                        notice: row.Notice,
                        mecanismes: row.Mécanismes,
                        themes: row.Thèmes,
                        tags: row.Tags,
                        description: row.Description,
                        image: row.Image,
                        logo: row.Logo,
                        video: row.Vidéo
                    });
                });
                // Créer la Zone si elle n'existe pas
                if(row['Zone plan'] !== "" && row.idZone !== undefined && row.idZone !== "" && row.idZone !== null){
                    Zone.findOrCreate({
                        where: {idZone : row.idZone,nom: row['Zone plan'], idFestival: idFestival, idPoste: idPoste },
                        defaults: {
                            idZone: row.idZone,
                            nom: row['Zone plan'],
                            idFestival: idFestival,
                            idPoste: idPoste
                        }
                    }).then(([zone, created]) => {
                        // Ajouter le jeu à la zone
                        JeuZone.findOrCreate({
                            where: { idJeu: row.idJeu, idZone: zone.idZone, recu : row.Reçu },
                            defaults: {
                                idJeu: row.idJeu,
                                idZone: zone.idZone,
                                aAnimer: row['À animer'],
                                recu: row.Reçu
                            }
                        }).then(([jeuZone, created]) => {
                            // Mettre à jour les champs de la table JeuZone
                            jeuZone.update({
                                aAnimer: row['À animer'],
                                recu: row.Reçu
                            });
                        });
                    });
                }
               
            });
            return
        } catch (error) {
            return error
        }
        
    },

    /**
     * Récupérer les jeux d'une zone
     * Requête GET avec un paramètre 'id' (ex: /jeux/zone/1)
     * Retourne un tableau de jeux
     */
    async getJeuxByZone(req,res){
        try{
            const jeux = await JeuZone.findAll({
                include: [{
                    model: Jeu,
                }],
                where: {idZone: req.params.id}
            });
            return res.status(200).json(jeux);
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = JeuController;