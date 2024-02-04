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
    "mdp" : await hashPassword("db3fee1bfb106ff8418f61c6009ef0a1ec584552c262f8c9fe82b6b693bf70f7")
    }

    await userClass.findOrCreate({ where: { pseudo: user.pseudo }, defaults: user })
}