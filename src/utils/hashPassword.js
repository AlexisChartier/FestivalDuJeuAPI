const bcrypt = require('bcrypt');

module.exports = async (password) => {
    // Ajouter une constante au mot de passe pour le rendre plus sécurisé
    const saltRounds = 10; // Vous pouvez ajuster le nombre de rounds
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(hashedPassword)
        return hashedPassword;
        
    } catch (error) {
        throw error;
    }
};
