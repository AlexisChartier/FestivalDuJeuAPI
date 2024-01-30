const jwt = require('jsonwebtoken');
module.exports = (user) => {
    const payload = {
        pseudo: user.pseudo,
        email: user.email,
        role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    return token;
}