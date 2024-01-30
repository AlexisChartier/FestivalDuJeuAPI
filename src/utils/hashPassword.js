const bcrypt = require('bcrypt');

module.exports = async (password) => {
    const saltRounds = 10; // Vous pouvez ajuster le nombre de rounds
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
};
