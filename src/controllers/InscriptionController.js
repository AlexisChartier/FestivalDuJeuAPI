const { where } = require('sequelize');
const db = require('../models'); 
const utils = require('../utils');

const InscriptionPoste = db.InscriptionCreneauxPoste;
const InscriptionZone = db.InscriptionCreneauxZone;
const CreneauxPoste = db.CreneauxPoste;
const CreneauxZone = db.CreneauxZone;
const FestivalPoste = db.FestivalPoste;
const Zone = db.Zone;
const User = db.User;


const InscriptionController = {

    /**
     * Récupérer les créneaux de poste d'un utilisateur pour un festival
     * Requête GET avec un paramètre 'idFestival' et 'pseudo' (ex: /inscriptions/postes/festival/1/pseudo)
    * Retourne un tableau de créneaux de poste
    */
    async getInscriptionsPosteByFestivalByUser(req,res){
        try{
            // Vérifier que l'utilisateur est bien celui connecté ou qu'il est admin
            if(req.params.pseudo !== req.user.pseudo && !req.user.role === 4){
                return res.status(400).json({ error: "L'utilisateur n'est pas celui connecté" });
            }
            // Vérifier que l'utilisateur existe
            const user = await User.findByPk(req.params.pseudo);
            if(!user){
                return res.status(400).json({ error: "L'utilisateur n'existe pas" });
            }
            // Récupérer les créneaux de poste auxquels l'utilisateur est inscrit
            const inscriptions = await InscriptionPoste.findAll({
                where: {pseudo: req.params.pseudo},
                include: {
                    model: CreneauxPoste,
                    include : {
                        model: FestivalPoste,
                        where: {idFestival: req.params.idFestival}
                        
                    }
                }
            });
            //Réorganiser les données pour les retourner sous forme de tableau
            // let creneaux = [];
            // for(let i=0; i<inscriptions.length; i++){
            //     let inscription = {};
            //     inscription.idCreneauPoste = inscriptions[i].idCreneauPoste;
            //     inscription.plageHoraire = inscriptions[i].CreneauxPoste.plageHoraire;
            //     inscription.idPoste = inscriptions[i].CreneauxPoste.FestivalPostes[0].idPoste;
            //     creneaux.push(inscription);
            // }
            return res.status(200).json(inscriptions);
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
     * Récupérer les créneaux de zone d'un utilisateur pour un festival
     * Requête GET avec un paramètre 'idFestival' et 'pseudo' (ex: /inscriptions/zones/festival/1/pseudo)
     * Retourne un tableau de créneaux de zone
     */
    async getInscriptionsZoneByFestivalByUser(req,res){
        try{
            // Vérifier que l'utilisateur est bien celui connecté ou qu'il est admin
            if(req.params.pseudo !== req.user.pseudo && !req.user.role === 4){
                return res.status(400).json({ error: "L'utilisateur n'est pas celui connecté" });
            }
            // Vérifier que l'utilisateur existe
            const user = await User.findByPk(req.params.pseudo);
            if(!user){
                return res.status(400).json({ error: "L'utilisateur n'existe pas" });
            }
            // Récupérer les zones auxquelles l'utilisateur est inscrit
            const inscriptions = await InscriptionZone.findAll({
                where: {pseudo: req.params.pseudo},
                include: {
                    model: CreneauxZone,
                    include : {
                        model: Zone,
                        where: {idFestival: req.params.idFestival}
                    }
                }
            });
            return res.status(200).json(inscriptions);
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
     * Inscrire un utilisateur à des créneaux de poste
     * Requête POST avec un body JSON (ex: /inscriptions/postes)
     * body : 
     * [{
     * "idCreneauPoste": 1,
     * "pseudo": "pseudo"
     * },
     * ...]
     * 
     * Retourne les créneaux de poste auxquels l'utilisateur est inscrit
     */
    async inscrirePoste(req,res){
        try{
            // Vérifier que l'utilisateur existe
            const user = User.findByPk(req.body[0].pseudo);
            if(!user){
                return res.status(400).json({ error: "L'utilisateur n'existe pas" });
            }
            // Vérifier que l'utilisateur est bien celui connecté
            if(req.body[0].pseudo !== req.user.pseudo){
                return res.status(400).json({ error: "L'utilisateur n'est pas celui connecté" });
            }
            // Vérifier que les créneaux de poste existent et que le nombre de places disponibles est suffisant
            for(let i=0; i<req.body.length; i++){
                const creneau = await CreneauxPoste.findByPk(req.body[i].idCreneauPoste);
                if(!creneau){
                    return res.status(400).json({ error: "Le créneau de poste n'existe pas" ,creneau : req.body[i].idCreneauPoste});
                } else {
                   // Compter combien d'incriptions il y a pour ce créneau
                    const count = await InscriptionPoste.count({where: {idCreneauPoste: req.body[i].idCreneauPoste}});
                    // Vérifier si le nombre de places disponibles est suffisant
                    if(count >= creneau.nombreMax){
                        return res.status(400).json({ error: "Le créneau de poste est complet" });
                    }
                    // Vérifier si l'utilisateur est déjà inscrit à un créneau de poste à cette plage horaire
                    // const inscriptions = await InscriptionPoste.findAll({where: {pseudo: req.body[i].pseudo}});
                    // for(let j=0; j<inscriptions.length; j++){
                    //     const creneauInscription = await CreneauxPoste.findByPk(inscriptions[j].idCreneauPoste);
                    //     if(creneauInscription.plageHoraire === creneau.plageHoraire){
                    //         return res.status(400).json({ error: "L'utilisateur est déjà inscrit à un créneau qui se déroule en même temps" });
                    //     }
                    // }
                }
            }
            const inscriptions = await InscriptionPoste.bulkCreate(req.body);
            return res.status(201).json(inscriptions);
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
     * Inscrire un utilisateur à des créneaux de zone
     * Requête POST avec un body JSON (ex: /inscriptions/zones)
     * body : 
     * [{
     * "idCreneauZone": 1,
     * "pseudo": "pseudo"
     * },
     * ...]
     * 
     * Retourne les créneaux de zone auxquels l'utilisateur est inscrit
     */
    async inscrireZone(req,res){
        try{
            // Vérifier que l'utilisateur existe
            const user = User.findByPk(req.body[0].pseudo);
            if(!user){
                return res.status(400).json({ error: "L'utilisateur n'existe pas" });
            }
            // Vérifier que l'utilisateur est bien celui connecté
            if(req.body[0].pseudo !== req.user.pseudo){
                return res.status(400).json({ error: "L'utilisateur n'est pas celui connecté" });
            }
            // Vérifier que les créneaux de zone existent et que le nombre de places disponibles est suffisant
            for(let i=0; i<req.body.length; i++){
                const creneau = await CreneauxZone.findByPk(req.body[i].idCreneauZone);
                if(!creneau){
                    return res.status(400).json({ error: "Le créneau de zone n'existe pas" });
                } else {
                    // Compter combien d'incriptions il y a pour ce créneau
                    const count = await InscriptionZone.count({where: {idCreneauZone: req.body[i].idCreneauZone}});
                    // Vérifier si le nombre de places disponibles est suffisant
                    if(count >= creneau.nombreMax){
                        return res.status(400).json({ error: "Le créneau de zone est complet" });
                    }
                    // Vérifier si l'utilisateur est déjà inscrit à un créneau de zone à cette plage horaire
                    // const inscriptions = await InscriptionZone.findAll({where: {pseudo: req.body[i].pseudo}});
                    // for(let j=0; j<inscriptions.length; j++){
                    //     const creneauInscription = await CreneauxZone.findByPk(inscriptions[j].idCreneauZone);
                    //     if(creneauInscription.plageHoraire === creneau.plageHoraire){
                    //         return res.status(400).json({ error: "L'utilisateur est déjà inscrit à un créneau qui se déroule en même temps" });
                    //     }
                    // }
                }
            }
            const inscriptions = await InscriptionZone.bulkCreate(req.body);

            // Vérifier si l'ensemble des créneaux pour cette plage horaire est complet
            const plageHoraire = await CreneauxZone.findByPk(req.body[0].idCreneauZone);
            const creneaux = await CreneauxZone.findAll({where: {plageHoraire: plageHoraire.plageHoraire}});
            let complet = true;
            for(let i=0; i<creneaux.length; i++){
                const count = await InscriptionZone.count({where: {idCreneauZone: creneaux[i].idCreneauZone}});
                if(count < creneaux[i].nombreMax){
                    complet = false;
                }
            }
            if(complet){
                // Ajouter 1 à tous les nombres max des créneaux de zone de cette plage horaire
                for(let i=0; i<creneaux.length; i++){
                    creneaux[i].nombreMax++;
                    await creneaux[i].save();
                }
            }
            return res.status(201).json(inscriptions);
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
     * Désinscrire un utilisateur d'un créneau de poste
     * Requête DELETE avec un paramètre 'id' (ex: /inscriptions/postes/1)
     * Retourne un message de confirmation
     */
    async desinscrirePoste(req,res){
        try{
            
            const inscription = await InscriptionPoste.findOne({where: {idCreneauPoste: req.params.id, pseudo: req.user.pseudo}});
            if(inscription){
                // Vérifier que l'utilisateur est bien celui connecté ou qu'il est admin
                if(inscription.pseudo !== req.user.pseudo  && req.user.role !== 4){
                    return res.status(400).json({ error: "L'utilisateur n'est pas celui connecté" });
                }
                await inscription.destroy();
                return res.status(200).json({ message: "L'inscription a bien été supprimée" });
            }else{
                return res.status(404).json({ error: "Cette inscription n'existe pas" });
            }
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
     * Désinscrire un utilisateur d'un créneau de zone
     * Requête DELETE avec un paramètre 'id' (ex: /inscriptions/zones/1)
     * Retourne un message de confirmation
     */
    async desinscrireZone(req,res){
        try{
            const inscription = await InscriptionZone.findOne({where: {idCreneauZone: req.params.id, pseudo: req.user.pseudo}});
            if(inscription){
                // Vérifier que l'utilisateur est bien celui connecté ou qu'il est admin
                if(inscription.pseudo !== req.user.pseudo  && req.user.role !== 4){
                    return res.status(400).json({ error: "L'utilisateur n'est pas celui connecté" });
                }
                await inscription.destroy();
                return res.status(200).json({ message: "L'inscription a bien été supprimée" });
            }else{
                return res.status(404).json({ error: "Cette inscription n'existe pas" });
            }
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

}

module.exports = InscriptionController;