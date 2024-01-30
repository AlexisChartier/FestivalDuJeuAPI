require('dotenv').config()
const {Sequelize} = require('sequelize')  
const db_config = require('../config/db')
const db = {}
const sequelize = new Sequelize(db_config.DB, db_config.USER, db_config.PASSWORD, db_config.CONFIG)
// Import all models
db.CreneauxEspace = require('./CreneauxEspace')(sequelize)
db.CreneauxPoste = require('./CreneauxPoste')(sequelize)
db.Espace = require('./Espace')(sequelize)
db.Festival = require('./Festival')(sequelize)
db.FestivalPoste = require('./FestivalPoste')(sequelize)
db.InscriptionCreneauxEspace = require('./InscriptionCreneauxEspace')(sequelize)
db.InscriptionCreneauxPoste = require('./InscriptionCreneauxPoste')(sequelize)
db.Jeu = require('./Jeu')(sequelize)
db.JeuEspace = require('./JeuEspace')(sequelize)
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

// Espace -> Festival
db.Espace.belongsTo(db.Festival, { foreignKey: 'idFestival', constraints: false });

// Espace -> Poste
db.Espace.belongsTo(db.Poste, { foreignKey: 'idPoste', constraints: false });

// JeuEspace -> Jeu
db.JeuEspace.belongsTo(db.Jeu, { foreignKey: 'idJeu', constraints: false });

// JeuEspace -> Espace
db.JeuEspace.belongsTo(db.Espace, { foreignKey: 'idEspace', constraints: false });

// CreneauxEspace -> Espace
db.CreneauxEspace.belongsTo(db.Espace, { foreignKey: 'idEspace', constraints: false });

// CreneauxEspace -> PlageHoraire
db.CreneauxEspace.belongsTo(db.PlageHoraire, { foreignKey: 'plageHoraire', constraints: false });

// PlageHoraire -> Festival
db.PlageHoraire.belongsTo(db.Festival, { foreignKey: 'idFestival', constraints: false });

// User -> Role
db.User.belongsTo(db.Role, { foreignKey: 'role', constraints: false });

// InscriptionCreneauxEspace -> User
db.InscriptionCreneauxEspace.belongsTo(db.User, { foreignKey: 'idUser', constraints: false });

// InscriptionCreneauxEspace -> CreneauxEspace
db.InscriptionCreneauxEspace.belongsTo(db.CreneauxEspace, { foreignKey: 'idCreneauxEspace', constraints: false });

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