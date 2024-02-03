const db = require('../models'); 
const utils = require('../utils');

const Poste = db.Poste;
const FestivalPoste = db.FestivalPoste;
const User = db.User;

const PosteController = {
        
    /**
    * Récupérer tous les postes
    * Requête GET sans paramètre
    * Retourne un tableau de postes
    */
    async getAllPostes(req,res){
        try{
            const postes = await Poste.findAll();
            return res.status(200).json(postes);
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Récupérer un poste
    * Requête GET avec un paramètre 'id' (ex: /postes/1)
    * Retourne un poste
    */
    async getPoste(req,res){
        try{
            const poste = await Poste.findByPk(req.params.id);
            if(poste){
                return res.status(200).json(poste);
            }else{
                return res.status(404).json({ error: "Ce poste n'existe pas" });
            }
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Créer un nouveau poste
    * Requête POST avec un corps de requête contenant :
    * {
    *    "nom": "ADMIN",
    *   "details" : "Gestion de l'administration",
    *  "pseudoReferent" : "admin"
    * }
    */
    async createPoste(req, res) {
        try {
            // Verifier que le pseudo du referent existe dans la table utilisateur
            const user = await User.findOne({where: {pseudo: req.body.pseudoReferent}});
            if(!user){
                return res.status(400).json({ error: "Le pseudo du référent n'existe pas" });
            }
            // Mettre à jour le rôle du referent
            user.role = 3;
            await user.save();
            // Créer le poste
            let newPoste = await Poste.create(req.body);
            newPoste = newPoste.get({ plain: true })
            return res.status(201).json(newPoste);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Supprimer un poste
    * Requête DELETE avec un paramètre 'id' (ex: /postes/1)
    * Retourne un message de confirmation
    */
    async deletePoste(req,res){
        try{
            const poste = await Poste.findByPk(req.params.id);
            if(poste){
                // Verifier si le referent est referent d'un autre poste
                const referent = await Poste.findOne({where: {pseudoReferent: poste.pseudoReferent}});
                if(!referent){
                    const user = await User.findByPk(poste.pseudoReferent);
                    user.role = 2;
                    await user.save();
                }
                await poste.destroy();
                return res.status(200).json({ message: "Le poste a bien été supprimé" });
            }else{
                return res.status(404).json({ error: "Ce poste n'existe pas" });
            }
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
     * Modifier un poste
     * Requête PUT avec un paramètre 'id' (ex: /postes/1)
     * et un corps de requête contenant :
     * {
     *  "nom": "ADMIN",
     * "details" : "Gestion de l'administration",
     * "pseudoReferent" : "admin"
     * }
     */
    async updatePoste(req,res){
        try{
            const poste = await Poste.findByPk(req.params.id);
            if(poste){
                // Verifier que le pseudo du referent existe
                const referent = await User.findByPk(req.body.pseudoReferent);
                if(!referent){
                    return res.status(400).json({ error: "Le pseudo du referent n'existe pas" });
                }
                // Verifier si l'ancien referent est referent d'un autre poste
                const oldReferent = await Poste.findOne({where: {pseudoReferent: poste.pseudoReferent}});
                // Si l'ancien referent n'est pas referent d'un autre poste, on met à jour son rôle
                if(!oldReferent){
                    const user = await User.findByPk(poste.pseudoReferent);
                    user.role = 2;
                    await user.save();
                }
                // Mettre à jour le poste
                await poste.update(req.body);

                // Mettre à jour le rôle du nouveau referent
                const user = await User.findByPk(req.body.pseudoReferent);
                user.role = 3;
                await user.save();
                // Retourner le poste
                return res.status(200).json(poste);
            }else{
                return res.status(404).json({ error: "Ce poste n'existe pas" });
            }
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
     * Récupérer les postes d'un festival
     * Requête GET avec un paramètre 'idFestival' (ex: /postes/festival/1)
     * Retourne un tableau de postes
     */
    async getPostesByFestival(req,res){
        try{
            const postes = await FestivalPoste.findAll({
                include: Poste,
                where: {idFestival: req.params.idFestival}
            });
            return res.status(200).json(postes);
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /** 
     * Récupérer le référent d'un poste
     * Requête GET avec un paramètre 'id' (ex: /postes/1/referent)
     * Retourne un utilisateur
     */
    async getReferentByPoste(req,res){
        try{
            let poste = await Poste.findByPk(req.params.id, {
                include: User
            });
            if(poste){
                // Effacer les données sensibles
                poste = poste.get({ plain: true });
                delete poste.User.mdp;
                delete poste.User.role;
                delete poste.User.associations;
                delete poste.User.tailleTshirt;
                delete poste.User.hebergement;
                delete poste.User.vegetarien;
                return res.status(200).json(poste.User);
            }else{
                return res.status(404).json({ error: "Ce poste n'existe pas" });
            }
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = PosteController;