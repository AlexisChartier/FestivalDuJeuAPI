const bcrypt = require('bcrypt');

module.exports = async (password) => {
    // Ajouter une constante au mot de passe pour le rendre plus sécurisé
    const salt = "a1z2e3r4t5y6u7i8o9p0";
    password = password + salt;
    const saltRounds = 10; // Vous pouvez ajuster le nombre de rounds
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(hashedPassword)
        return hashedPassword;
        
    } catch (error) {
        throw error;
    }
};
