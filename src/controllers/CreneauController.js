const db = require('../models'); 
const utils = require('../utils');

const CreneauxPoste = db.CreneauxPoste;
const Poste = db.Poste;
const CreneauxZone = db.CreneauxZone;

const CreneauController = {
        
    /**
    * Récupérer tous les créneaux de poste
    * Requête GET sans paramètre
    * Retourne un tableau de créneaux de poste
    */
    async getAllCreneauxPoste(req,res){
        try{
            const creneaux = await CreneauxPoste.findAll();
            return res.status(200).json(creneaux);
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
     *  Récupérer tous les créneaux d'un poste
     * Requête GET avec un paramètre 'id' (ex: /creneaux/poste/1)
     * Retourne un tableau de créneaux de poste
     * */
    async getCreneauxPoste(req,res){
        try{
            // vérifier que le poste existe
            const poste = await Poste.findByPk(req.params.id);
            if(!poste){
                return res.status(404).json({ error: "Ce poste n'existe pas" });
            }
            const creneaux = await CreneauxPoste.findAll({where: {idPoste: req.params.id}});
            return res.status(200).json(creneaux);
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
     * Récupérer tous les créneaux d'une zone
     * Requête GET avec un paramètre 'id' (ex: /creneaux/zone/1)
     * Retourne un tableau de créneaux de zone
     * 
     */
    async getCreneauxZone(req,res){
        try{
            // vérifier que la zone existe
            const zone = await Zone.findByPk(req.params.id);
            if(!zone){
                return res.status(404).json({ error: "Cette zone n'existe pas" });
            }
            const creneaux = await CreneauxZone.findAll({where: {idZone: req.params.id}});
            return res.status(200).json(creneaux);
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },



    /**
    * Récupérer tous les créneaux de zone
    * Requête GET sans paramètre
    * Retourne un tableau de créneaux de zone
    */
    async getAllCreneauxZone(req,res){
        try{
            const creneaux = await CreneauxZone.findAll();
            return res.status(200).json(creneaux);
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },


    /**
     * Créer des créneaux de poste
     * Requête POST avec un body JSON
     * [{
     *  "idPoste": 1,
     * "plageHoraire": 1,
     * "nombreMax": 10
     * },
     * ...]
     * Retourne les créneaux de poste créé
     */
    async createCreneauxPoste(req,res){
        try{
            const creneaux = await CreneauxPoste.bulkCreate(req.body);
            return res.status(201).json(creneaux);
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
     * Créer des créneaux de zone
     * Requête POST avec un body JSON
     * [{
     *  "idZone": 1,
     * "plageHoraire": 1,
     * "nombreMax": 10
     * },
     * ...]
     * Retourne les créneaux de zone créé
     */
    async createCreneauxZone(req,res){
        try{
            const creneaux = await CreneauxZone.bulkCreate(req.body);
            return res.status(201).json(creneaux);
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
     * Supprimer un créneau de poste
     * Requête DELETE avec un paramètre 'id' (ex: /creneauxPoste/1)
     * Retourne un message de confirmation
     */
    async deleteCreneauPoste(req,res){
        try{
            const creneau = await CreneauxPoste.findByPk(req.params.id);
            if(creneau){
                await creneau.destroy();
                return res.status(200).json({ message: "Le créneau de poste a été supprimé" });
            }else{
                return res.status(404).json({ error: "Ce créneau de poste n'existe pas" });
            }
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
     * Supprimer un créneau de zone
     * Requête DELETE avec un paramètre 'id' (ex: /creneauxZone/1)
     * Retourne un message de confirmation
     */
    async deleteCreneauZone(req,res){
        try{
            const creneau = await CreneauxZone.findByPk(req.params.id);
            if(creneau){
                await creneau.destroy();
                return res.status(200).json({ message: "Le créneau de zone a été supprimé" });
            }else{
                return res.status(404).json({ error: "Ce créneau de zone n'existe pas" });
            }
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
     * Modifier un créneau de poste
     * Requête PUT avec un paramètre 'id' (ex: /creneauxPoste/1)
     * et un body JSON
     * {
     * "nombreMax": 10
     * }
     */
    async updateCreneauPoste(req,res){
        try{
            const creneau = await CreneauxPoste.findByPk(req.params.id);
            if(creneau){
                await creneau.update(req.body);
                return res.status(200).json(creneau);
            }else{
                return res.status(404).json({ error: "Ce créneau de poste n'existe pas" });
            }
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
     * Modifier un créneau de zone
     * Requête PUT avec un paramètre 'id' (ex: /creneauxZone/1)
     * et un body JSON
     * {
     * "nombreMax": 10
     * }
     */
    async updateCreneauZone(req,res){
        try{
            const creneau = await CreneauxZone.findByPk(req.params.id);
            if(creneau){
                await creneau.update(req.body);
                return res.status(200).json(creneau);
            }else{
                return res.status(404).json({ error: "Ce créneau de zone n'existe pas" });
            }
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    }

}

module.exports = CreneauController;