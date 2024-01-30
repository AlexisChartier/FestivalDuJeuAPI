const db = require('../models'); // Assurez-vous que le chemin est correct
const Role = db.Role;
const utils = require('../utils');

const RoleController = {
    
    /**
    * Récupérer tous les rôles
    * Requête GET sans paramètre
    * Retourne un tableau de rôles
    */
    async getAllRoles(req,res){
        try{
            const roles = await Role.findAll();
            return res.status(200).json(roles);
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Récupérer un rôle
    * Requête GET avec un paramètre 'id' (ex: /roles/1)
    * Retourne un rôle
    */
    async getRole(req,res){
        try{
            const role = await Role.findByPk(req.params.id);
            if(role){
                return res.status(200).json(role);
            }else{
                return res.status(404).json({ error: "Ce rôle n'existe pas" });
            }
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Créer un nouveau rôle
    * Requête POST avec un corps de requête contenant :
    * {
    *    "nom": "ADMIN",
    * }
    */
    async createRole(req, res) {
        try {
            let newRole = await Role.create(req.body);
            newRole = newRole.get({ plain: true })
            return res.status(201).json(newRole);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Supprimer un rôle
    * Requête DELETE avec un paramètre 'id' (ex: /roles/1)
    * Retourne un message de confirmation
    */
    async deleteRole(req,res){
        try{
            const role = await Role.findByPk(req.params.id);
            if(role){
                await role.destroy();
                return res.status(200).json({ message: "Le rôle a bien été supprimé" });
            }else{
                return res.status(404).json({ error: "Ce rôle n'existe pas" });
            }
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
    * Modifier un rôle
    * Requête PUT avec un paramètre 'id' (ex: /roles/1) et un corps de requête contenant :
    * {
    *   "nom": "ADMIN",
    * }
    */
    async updateRole(req,res){
        try{
            let updated = await Role.update(req.body, {
                where: { idRole: req.params.id }
            });
            if(updated[0] === 0){
                return res.status(404).json({ error: "Rôle non trouvé" });
            }
            updated = await Role.findByPk(req.params.id);
            updated = updated.get({ plain: true })
            return res.status(200).json(updated);
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = RoleController;