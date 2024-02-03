const { Model, DataTypes } = require('sequelize');

class PlageHoraire extends Model {}

module.exports = (sequelize) => {
  PlageHoraire.init({
    idPlage: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    heureDebut: {
      type: DataTypes.TIME
    },
    heureFin: {
      type: DataTypes.TIME
    },
    jour: {
      type: DataTypes.DATE
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
