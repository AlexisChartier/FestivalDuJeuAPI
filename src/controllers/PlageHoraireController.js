const db = require('../models'); 
const utils = require('../utils');

const PlageHoraire = db.PlageHoraire;

const PlageHoraireController = {
        
    /**
    * Récupérer toutes les plages horaires
    * Requête GET sans paramètre
    * Retourne un tableau de plages horaires
    */
    async getAllPlagesHoraires(req,res){
        try{
            const plagesHoraires = await PlageHoraire.findAll();
            return res.status(200).json(plagesHoraires);
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Récupérer une plage horaire
    * Requête GET avec un paramètre 'id' (ex: /plagesHoraires/1)
    * Retourne une plage horaire
    */
    async getPlageHoraire(req,res){
        try{
            const plageHoraire = await PlageHoraire.findByPk(req.params.id);
            if(plageHoraire){
                return res.status(200).json(plageHoraire);
            }else{
                return res.status(404).json({ error: "Plage horaire non trouvée" });
            }
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Créer une plage horaire
    * Requête POST avec un body JSON (ex: /plagesHoraires)
    * Retourne la plage horaire créée
    */
    async createPlageHoraire(req,res){
        try{
            const plageHoraire = await PlageHoraire.create(req.body);
            return res.status(201).json(plageHoraire);
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Modifier une plage horaire
    * Requête PUT avec un paramètre 'id' (ex: /plagesHoraires/1)
    * et un body JSON
    * Retourne la plage horaire modifiée
    */
    async updatePlageHoraire(req,res){
        try{
            const plageHoraire = await PlageHoraire.findByPk(req.params.id);
            if(plageHoraire){
                await plageHoraire.update(req.body);
                return res.status(200).json(plageHoraire);
            }else{
                return res.status(404).json({ error: "Plage horaire non trouvée" });
            }
        }
        catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
     * Récupérer les plages horaires d'un festival
     * Requête GET avec un paramètre 'idFestival' (ex: /plagesHoraires/festival/1)
     * Retourne un tableau de plages horaires
     */
    async getPlagesHorairesByFestival(req,res){
        try{
            const plagesHoraires = await PlageHoraire.findAll({
                where: {idFestival: req.params.id}
            });
            return res.status(200).json(plagesHoraires);
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = PlageHoraireController;