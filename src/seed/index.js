module.exports = async (db) => {
    require('./roles')(db.Role);
}