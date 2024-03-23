const {hashPassword} = require ("../utils")
module.exports = async (userClass) => {
    const user =  {
    "pseudo": "Admin",
    "nom": "Mezghenna",
    "prenom": "romain",
    "tailleTshirt": "S",
    "vegetarien": false,
    "hebergement": false,
    "role": 4,
    "email" : "email",
    "tel" : "0123456789",
    "mdp" : await hashPassword("8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918")
    }

    await userClass.findOrCreate({ where: { pseudo: user.pseudo }, defaults: user })
}