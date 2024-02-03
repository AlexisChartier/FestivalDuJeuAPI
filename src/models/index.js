require('dotenv').config()
const {Sequelize} = require('sequelize')  
const db_config = require('../config/db')
const db = {}
const sequelize = new Sequelize(db_config.DB, db_config.USER, db_config.PASSWORD, db_config.CONFIG)
// Import all models
db.CreneauxZone = require('./CreneauxZone')(sequelize)
db.CreneauxPoste = require('./CreneauxPoste')(sequelize)
db.Zone = require('./Zone')(sequelize)
db.Festival = require('./Festival')(sequelize)
db.FestivalPoste = require('./FestivalPoste')(sequelize)
db.InscriptionCreneauxZone = require('./InscriptionCreneauxZone')(sequelize)
db.InscriptionCreneauxPoste = require('./InscriptionCreneauxPoste')(sequelize)
db.Jeu = require('./Jeu')(sequelize)
db.JeuZone = require('./JeuZone')(sequelize)
db.PlageHoraire = require('./PlageHoraire')(sequelize)
db.Poste = require('./Poste')(sequelize)
db.Role = require('./Role')(sequelize)
db.User = require('./User')(sequelize)

// Create associations

// Associations basées sur les instructions ALTER TABLE fournies

// Poste -> User
db.Poste.belongsTo(db.User, { foreignKey: 'pseudoReferent', constraints: false });

// FestivalPoste -> Festival
db.FestivalPoste.belongsTo(db.Festival, { foreignKey: 'idFestival', constraints: false });

// FestivalPoste -> Poste
db.FestivalPoste.belongsTo(db.Poste, { foreignKey: 'idPoste', constraints: false });

// Zone -> Festival
db.Zone.belongsTo(db.Festival, { foreignKey: 'idFestival', constraints: false });

// Zone -> Poste
db.Zone.belongsTo(db.Poste, { foreignKey: 'idPoste', constraints: false });

// JeuZone -> Jeu
db.JeuZone.belongsTo(db.Jeu, { foreignKey: 'idJeu', constraints: false });

// JeuZone -> Zone
db.JeuZone.belongsTo(db.Zone, { foreignKey: 'idZone', constraints: false });

// CreneauxZone -> Zone
db.CreneauxZone.belongsTo(db.Zone, { foreignKey: 'idZone', constraints: false });

// CreneauxZone -> PlageHoraire
db.CreneauxZone.belongsTo(db.PlageHoraire, { foreignKey: 'plageHoraire', constraints: false });

// PlageHoraire -> Festival
db.PlageHoraire.belongsTo(db.Festival, { foreignKey: 'idFestival', constraints: false });

// User -> Role
db.User.belongsTo(db.Role, { foreignKey: 'role', constraints: false });

// InscriptionCreneauxZone -> User
db.InscriptionCreneauxZone.belongsTo(db.User, { foreignKey: 'idUser', constraints: false });

// InscriptionCreneauxZone -> CreneauxZone
db.InscriptionCreneauxZone.belongsTo(db.CreneauxZone, { foreignKey: 'idCreneauxZone', constraints: false });

// CreneauxPoste -> PlageHoraire
db.CreneauxPoste.belongsTo(db.PlageHoraire, { foreignKey: 'plageHoraire', constraints: false });

// CreneauxPoste -> Poste
db.CreneauxPoste.belongsTo(db.Poste, { foreignKey: 'idPoste', constraints: false });

// InscriptionCreneauxPoste -> User
db.InscriptionCreneauxPoste.belongsTo(db.User, { foreignKey: 'idUser', constraints: false });

// InscriptionCreneauxPoste -> CreneauxPoste
db.InscriptionCreneauxPoste.belongsTo(db.CreneauxPoste, { foreignKey: 'idCreneauxPoste', constraints: false });

db.sequelize = sequelize

module.exports = db