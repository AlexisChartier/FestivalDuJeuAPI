const bcrypt = require('bcrypt');
const salt = "a1z2e3r4t5y6u7i8o9p0";
module.exports = (password, hashedPassword) => { return bcrypt.compare(password + salt, hashedPassword); }