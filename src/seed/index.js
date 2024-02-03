module.exports = async (db) => {
    require('./roles')(db.Role);
    require('./user')(db.User);
}