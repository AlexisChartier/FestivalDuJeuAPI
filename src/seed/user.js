const {hashPassword} = require ("../utils")
module.exports = async (userClass) => {
    const user =  {
    "pseudo": "admin",
    "nom": "Mezghenna",
    "prenom": "romain",
    "tailleTshirt": "S",
    "vegetarien": false,
    "hebergement": false,
    "role": 4,
    "email" : "email",
    "tel" : "0123456789",
    "mdp" : await hashPassword("admin123")
    }

    await userClass.findOrCreate({ where: { pseudo: user.pseudo }, defaults: user })
}