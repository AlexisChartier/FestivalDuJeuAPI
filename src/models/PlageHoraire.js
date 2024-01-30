const { Model, DataTypes } = require('sequelize');

class PlageHoraire extends Model {}

module.exports = (sequelize) => {
  PlageHoraire.init({
    idPlage: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    heureDebut: {
      type: DataTypes.STRING(5)
    },
    heureFin: {
      type: DataTypes.STRING(5)
    },
    jour: {
      type: DataTypes.STRING(10)
    },
    idFestival: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'PlageHoraire',
    timestamps: false,
    freezeTableName: true
  });

  return PlageHoraire;
};
