const bcrypt = require('bcrypt');

module.exports = async (password) => {
    // Ajouter un chiffre aléatoire au mot de passe pour renforcer la sécurité
    password += Math.floor(Math.random() * 100);
    const saltRounds = 10; // Vous pouvez ajuster le nombre de rounds
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
};
