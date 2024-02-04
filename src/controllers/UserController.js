const db = require('../models');
const User = db.User;
const Role = db.Role;
const utils = require('../utils');

const UserController = {

    /**
     * Vérifier si un utilisateur existe
     * Requête GET avec un paramètre 'pseudo' (ex: /users/user123)
     * Retourne true si l'utilisateur existe, false sinon
     */
    async checkIfUserExists(req,res){
        try{
            const user = await User.findByPk(req.params.pseudo);
            if(user){
                return res.status(200).json(true);
            }else{
                return res.status(200).json(false);
            }
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    },

    /**
     * Créer un nouvel utilisateur
     * Requête POST avec un corps de requête contenant :
     * {
     *    "pseudo": "user123",
     *    "nom": "Doe",
     *    "prenom": "John",
     *    "mdp": "password123",
     *    "tailleTshirt": "M",
     *    "vegetarien": true,
     *    "hebergement": false,
     * }
     * Le role est mis par défaut à 2 (BENEVOLE)
     * Le mot de passe est hashé avant d'être stocké en base de données
     */
    async createUser(req, res) {
        try {
            // Checks if the pseudo is available
            const exists = await User.findByPk(req.body.pseudo);
            if(exists){
                return res.status(409).json({ error: "Ce pseudo est déjà utilisé" });
            }
            // Put the role as 2 (BENEVOLE) by default
            req.body.role = 2;
            // Hash the password
            req.body.mdp = await utils.hashPassword(req.body.mdp);
            let newUser = await User.create(req.body);
            newUser = newUser.get({ plain: true })
            // Enlever le mot de passe, l'email, le numéro de téléphone
            newUser.mdp = undefined;
            newUser.tel = undefined;
            newUser.email = undefined;
            return res.status(201).json(newUser);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    /**
     * Récupérer tous les utilisateurs
     * Requête GET sans paramètre
     */
    async getAllUsers(req, res) {
        try {
            // Vérifier si l'utilisateur est un admin
            if(req.user.role !== 4){
                return res.status(403).json({ error: "Vous n'êtes pas autorisé à récupérer tous les utilisateurs" });
            }
            let users = await User.findAll();
            // Enlever le mot de passe, l'email, le numéro de téléphone 
            users.forEach(user => {
                const plainUser = user.get({ plain: true });
                plainUser.mdp = undefined;
                plainUser.tel = undefined;
                plainUser.email = undefined;
                return plainUser;
            });
            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    /**
     * Récupérer un utilisateur spécifique par pseudo
     * Requête GET avec un paramètre 'pseudo' (ex: /users/user123)
     */
    async getUserByPseudo(req, res) {
        try {
            let user = await User.findByPk(req.params.pseudo);
            if(user){
                user = user.get({ plain: true })
                // Enlever le mot de passe 
                delete user.mdp;
                // Si l'utilisateur n'est pas un admin, il ne peut récupérer que des infos superflues
                if(req.user.role !== 4 && req.user.pseudo !== user.pseudo){
                    // Enlever le mot de passe, l'email, le numéro de téléphone
                    delete user.tel;
                    delete user.nom;
                    delete user.prenom;
                    delete user.associations;
                    delete user.tailleTshirt;
                    delete user.hebergement;
                } 
                // Si l'utilisateur est un référent, il récupère les infos de contact des bénévoles

                return res.status(200).json(user);
            } else {
                return res.status(404).json({ error: "Utilisateur non trouvé" });
            }
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },


    /**
     * Vérifier si les identifiants d'un utilisateur sont corrects et le connecter (créer un token)
     * Requête POST avec un corps de requête contenant :
     * {
     *   "pseudo": "user123",
     *  "mdp": "password123"
     * }
     * Retourne true si les identifiants sont corrects, false sinon
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async login(req,res){
        try{
            const user = await User.findByPk(req.body.pseudo);
            if(user){
                const match = await utils.comparePassword(req.body.mdp, user.mdp);
                if(match){
                    let returnedUser = {}
                    returnedUser.pseudo = user.pseudo;
                    returnedUser.role = user.role;
                    const token = utils.generateToken(user);
                    returnedUser.token = token;
                    return res.status(200).json(returnedUser);
                }else{
                    return res.status(200).json({ error: "Identifiants incorrects" });
                }
            }else{
                return res.status(200).json({ error: "Utilisateur non trouvé" });
            }
        }catch(error){
            return res.status(400).json({ error: "Une erreur est survenue lors de l'authentification" });
        }
    },

    /**
     * Mettre à jour un utilisateur
     * Requête PUT avec un paramètre 'pseudo' et un corps de requête contenant les champs à mettre à jour.
     * Exemple de corps de requête :
     * {
     *    "nom": "Doe Updated",
     *    "prenom": "John Updated"
     * }
     */
    async updateUser(req, res) {
        try {
            // Si l'utilisateur n'est pas un admin, il ne peut mettre à jour que son propre profil
            if(req.user.role !== 4 && req.user.pseudo !== req.params.pseudo){
                return res.status(403).json({ error: "Vous n'êtes pas autorisé à mettre à jour cet utilisateur" });
            }
            // Hash the password if it is updated
            if(req.body.mdp){
                req.body.mdp = await utils.hashPassword(req.body.mdp);
            }
            let updated = await User.update(req.body, {
                where: { pseudo: req.params.pseudo }
            });
            if(updated[0] === 0){
                return res.status(404).json({ error: "Utilisateur non trouvé" });
            }
            // Changement de role uniquement pour l'admin 
            if(req.body.role && req.user.role === 4){
                const role = await Role.findByPk(req.body.role);
                if(!role){
                    return res.status(404).json({ error: "Role non trouvé" });
                }
                updated = await User.update({ role: req.body.role }, {
                    where: { pseudo: req.params.pseudo }
                });
            } else if (req.body.role && req.user.role !== 4){
                return res.status(403).json({ error: "Vous n'êtes pas autorisé à mettre à jour le role de cet utilisateur" });
            }
            updated = await User.findByPk(req.params.pseudo);
            updated = updated.get({ plain: true })
            // Enlever le mot de passe,
            updated.mdp = undefined;
            return res.status(200).json(updated);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    /**
     * Supprimer un utilisateur
     * Requête DELETE avec un paramètre 'pseudo' (ex: /users/user123)
     */
    async deleteUser(req, res) {
        try {
            // Find the user
            const user = await User.findByPk(req.params.pseudo);
            if(user){
                // Checks if the user pseudo is the same as the one in the token or if the user is an admin role = 4
                if(req.user.pseudo !== user.pseudo && req.user.role !== 4){
                    return res.status(403).json({ error: "Vous n'êtes pas autorisé à supprimer cet utilisateur" });
                }
                // Delete the user
                await user.destroy();
                return res.status(204).json(true);
            }
            else {
                return res.status(404).json({ error: "Utilisateur non trouvé" });
            }
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    /**
     * Récupérer un utilisateur et son rôle associé
     * Requête GET avec un paramètre 'pseudo' pour récupérer les informations de l'utilisateur et son rôle.
     * (ex: /users/user123/role)
     */
    async getUserWithRole(req, res) {
        try {
            // Si l'utilisateur n'est pas un admin, il ne peut récupérer que son propre profil
            if(req.user.role !== 4 && req.user.pseudo !== req.params.pseudo){
                return res.status(403).json({ error: "Vous n'êtes pas autorisé à récupérer cet utilisateur" });
            }
            let user = await User.findByPk(req.params.pseudo, {
                include: [Role]
            });
            if(!user){
                return res.status(404).json({ error: "Utilisateur non trouvé" });
            }
            user = user.get({ plain: true })
            // Enlever le mot de passe, l'email, le numéro de téléphone
            user.mdp = undefined;
            user.tel = undefined;
            user.email = undefined;
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    /**
     * Récupérer le nom, le prénom et l'email des bénévoles avec hébergement = true
     * Requête GET sans paramètre
     * Retourne une liste de bénévoles avec hébergement
     * 
     */
    async getUserWithHebergement(req, res) {
        try {
            // Vérifier que l'user est au moins un bénévole
            if(req.user.role < 2){
                return res.status(403).json({ error: "Vous n'êtes pas autorisé à récupérer les bénévoles avec hébergement" });
            }
            let users = await User.findAll({
                where: { hebergement: true },
                attributes: ['nom', 'prenom', 'email']
            });
            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    /**
     * Récupéreer le role et le nom d'un utilisateur qui envoie son token
     */
    async getUserRoleAndNameFromToken(req,res){
        try{
            console.log(req.user)
            const user = await User.findByPk(req.user.pseudo);
            if(user){
                const returnedUser = {}
                returnedUser.role = user.role;
                returnedUser.pseudo = user.pseudo;
                return res.status(200).json(returnedUser);
            }else{
                return res.status(404).json({ error: "Utilisateur non trouvé"});
            }
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    }
};

module.exports = UserController;
