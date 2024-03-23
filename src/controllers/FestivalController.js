const db = require('../models'); 
const utils = require('../utils');

const Festival = db.Festival;
const Poste = db.Poste;
const PlageHoraire = db.PlageHoraire;
const FestivalPoste = db.FestivalPoste;
const FestivalUser = db.FestivalUser;
const User = db.User;

const FestivalController = {
        
    /**
    * Récupérer tous les festivals
    * Requête GET sans paramètre
    * Retourne un tableau de festivals
    */
    async getAllFestivals(req,res){
        try{
            const festivals = await Festival.findAll({
                include: [
                    {
                        model: FestivalPoste,
                        include: {
                            model: Poste,
                        }
                    },
                    {
                        model: PlageHoraire,
                    }
                ]
            });
            return res.status(200).json(festivals);
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Récupérer un festival
    * Requête GET avec un paramètre 'id' (ex: /festivals/1)
    * Retourne un festival
    */
    async getFestival(req,res){
        try{
            // Retourner le festival + les postes associés + ses plages horaires
            const festival = await Festival.findByPk(req.params.id, {
                include: [
                    {
                        model: FestivalPoste,
                        include: {
                            model: Poste,
                        }
                    },
                    {
                        model: PlageHoraire,
                    }
                ]
            });
            if(festival){
                return res.status(200).json(festival);
            }else{
                return res.status(404).json({ error: "Ce festival n'existe pas" });
            }
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Créer un nouveau festival
    * Requête POST avec un corps de requête contenant :
    * {
    *    "nom": "Festival de l'été",
    *    "dateDebut": "2021-06-01",
    *    "dateFin": "2021-06-05",
    *    "plageHoraires" : [{
    *       heureDebut: "08:00",
    *       heureFin: "10:00"
    *       jour : "2021-06-01"
    *       },
    *      {
    *      heureDebut: "10:00",
    *     heureFin: "12:00"
    *    jour : "2021-06-01"
    *   }...],
    *   "postes" : [
    *      soit : {idPoste :1} si existant, 
    *      soit : {nom: "Buvette", details: "Vente de boissons", pseudoReferent : "user123"} si non existant
    *   ]
    *   
    * }
    */
    async createFestival(req, res) {
        try {
            // Verifier que les postes existent
            for (const poste of req.body.postes) {
                if(poste.idPoste){
                    const existingPoste = await Poste.findByPk(poste.idPoste);
                    if(!existingPoste){
                        return res.status(400).json({ error: "Le poste n'existe pas",poste : poste});
                    }
                } else {
                    // Verifier que le pseudoReferent existe
                    const referent = await User.findByPk(poste.pseudoReferent);
                    if(!referent){
                        return res.status(400).json({ error: "Le pseudo du referent n'existe pas" });
                    }
                }
            }
            // Verifier que les plages horaires et dates sont valides
            if(!utils.validatePlageHoraires(req.body.plageHoraires, req.body.dateDebut, req.body.dateFin)){
                return res.status(400).json({ error: "Les plages horaires ne sont pas valides" });
            }

            // Créer le festival 
            let newFestival = await Festival.create(req.body).then(async (festival) => {
                // Create the plage horaires
                for (const plageHoraire of req.body.plageHoraires) {
                    plageHoraire.idFestival = festival.idFestival;
                    PlageHoraire.create(plageHoraire);
                }
                // Create the postes or associate the existing ones
                for (const poste of req.body.postes) {
                    if(poste.idPoste){
                        FestivalPoste.create({idFestival: festival.idFestival, idPoste: poste.idPoste});
                    }else{
                        Poste.create(poste).then(newPoste => {
                            FestivalPoste.create({idFestival: festival.idFestival, idPoste: newPoste.idPoste});
                        });
                    }
                }
                return festival;
            });
            newFestival = newFestival.get({ plain: true })
            return res.status(201).json(newFestival);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Supprimer un festival
    * Requête DELETE avec un paramètre 'id' (ex: /festivals/1)
    * Retourne un message de confirmation
    */
    async deleteFestival(req,res){
        try{
            const festival = await Festival.findByPk(req.params.id);
            if(festival){
                await festival.destroy();
                return res.status(200).json({ message: "Le festival a bien été supprimé" });
            }
            else{
                return res.status(404).json({ error: "Ce festival n'existe pas" });
            }
        }
        catch(error){
            return res.status(400).json({ error: error.message });
        }
    },
    /**
     * Savoir si l'utilisateur en cours est inscrit à un festival 
     * Requête GET avec un paramètre 'id' (ex: /festivals/:id/inscription)
     * Retourne un message de confirmation
     */
    async isRegistered(req,res){
        try{
            const festivalUser = await FestivalUser.findOne({
                where: {
                    idFestival: req.params.id,
                    pseudo: req.user.pseudo
                }
            });
            if(festivalUser){
                return res.status(200).json({ message: "L'utilisateur est inscrit à ce festival" });
            }
            else{
                return res.status(404).json({ error: "L'utilisateur n'est pas inscrit à ce festival" });
            }
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },
    /**
     * 
     * S'inscrire à un festival
     * Requête POST avec un body contenant un idFestival
     * Retourne un message de confirmation
     */
    async register(req,res){
        // Vérifier que le festival existe
        const festival = await Festival.findByPk(req.body.idFestival);
        if(festival){
            // Vérifier que l'utilisateur existe
            const user = await User.findByPk(req.user.pseudo);
            if(user){
                // Vérifier que l'utilisateur n'est pas déjà inscrit
                const isRegistered = await FestivalUser.findOne({
                    where: {
                        idFestival: festival.idFestival,
                        pseudo: user.pseudo
                    }
                });
                if(isRegistered){
                    return res.status(400).json({ error: "L'utilisateur est déjà inscrit à ce festival" });
                }
                else{
                    // Inscrire l'utilisateur au festival
                    await FestivalUser.create({idFestival: festival.idFestival, pseudo: user.pseudo});
                    return res.status(201).json({ message: "L'utilisateur a bien été inscrit au festival" });
                }
            } else {
                return res.status(404).json({ error: "L'utilisateur n'existe pas" });
            }
        } else {
            return res.status(404).json({ error: "Le festival n'existe pas" });
        }
    },
    /**
     * Savoir si il y a un festival en cours
     * Requête GET sans paramètre
     * Retourne un message de confirmation
     */
    async isFestivalInCourse(req,res){
        try{
            const festival = await Festival.findOne({
                where: {
                    dateDebut: {
                        [db.Sequelize.Op.lte]: new Date()
                    },
                    dateFin: {
                        [db.Sequelize.Op.gte]: new Date()
                    }
                }
            });
            if(festival){
                return res.status(200).json({ message: "Un festival est en cours" });
            }
            else{
                return res.status(404).json({ error: "Aucun festival en cours" });
            }
        } catch(error){
            return res.status(400).json({ error: error.message });
        }
    }

}

module.exports = FestivalController;
