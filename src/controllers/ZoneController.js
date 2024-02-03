const db = require('../models'); 
const utils = require('../utils');

const Zone = db.Zone;

const ZoneController = {
    /**
     * Récupère toutes les zones
     * Requête GET sans paramètre
     * Retourne un tableau de zones
     */
    async getAllZones(req,res){
        try{
            const zones = await Zone.findAll();
            return res.status(200).json(zones);
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
     * Récupère une zone
     * Requête GET avec un paramètre 'id' (ex: /zones/1)
     * Retourne une zone
     */
    async getZone(req,res){
        try{
            const zone = await Zone.findByPk(req.params.id);
            if(zone){
                return res.status(200).json(zone);
            }else{
                return res.status(404).json({ error: "Cette zone n'existe pas" });
            }
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
     * Créer une nouvelle zone
     * Requête POST avec un corps de requête contenant :
     * {
     *   "nom": "Zone 1",
     *  "idPoste": 1,
     * "idFestival": 1
     * }
     * 
     */
    async createZone(req, res) {
        // find the latestZone and increment it by 1 its id
        const lastestZone = await Zone.findOne({order: [ [ 'idZone', 'DESC' ]]});
        if(lastestZone){
            req.body.id = lastestZone.id + 1;
        } else {
            req.body.id = 1;
        }
        try {
            let newZone = await Zone.create(req.body);
            newZone = newZone.get({ plain: true })
            return res.status(201).json(newZone);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    /**
     * Supprimer une zone
     * Requête DELETE avec un paramètre 'id' (ex: /zones/1)
     * Retourne un message de confirmation
     * 
     */
    async deleteZone(req,res){
        try{
            const zone = await Zone.findByPk(req.params.id);
            if(zone){
                await zone.destroy();
                return res.status(200).json({ message: "La zone a été supprimée avec succès" });
            }else{
                return res.status(404).json({ error: "Cette zone n'existe pas" });
            }
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },
    /**
     * Récupere les zones d'un poste
     * Requête GET avec un paramètre 'idPoste' (ex: /zones/poste/1)
     * Retourne un tableau de zones
     */
    async getZonesByPoste(req,res){
        try{
            const zones = await Zone.findAll({where: {idPoste: req.params.idPoste}});
            return res.status(200).json(zones);
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },
    /**
     * Récupere les zones d'un festival
     * Requête GET avec un paramètre 'idFestival' (ex: /zones/festival/1)
     * Retourne un tableau de zones
     */
    async getZonesByFestival(req,res){
        try{
            const zones = await Zone.findAll({where: {idFestival: req.params.idFestival}});
            return res.status(200).json(zones);
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },
    /**
     * Modifier une zone
     * Requête PUT avec un paramètre 'id' (ex: /zones/1)
     * Retourne la zone modifiée
     */
    async updateZone(req,res){
        try{
            const zone = await Zone.findByPk(req.params.id);
            if(zone){
                await zone.update(req.body);
                return res.status(200).json(zone);
            }else{
                return res.status(404).json({ error: "Cette zone n'existe pas" });
            }
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    }

}

module.exports = ZoneController;