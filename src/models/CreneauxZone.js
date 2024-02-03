const { Model, DataTypes } = require('sequelize');

class CreneauxZone extends Model {}

module.exports = (sequelize) => {
  CreneauxZone.init({
    idCreneauxZone: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    idZone: {
      type: DataTypes.INTEGER
    },
    plageHoraire: {
      type: DataTypes.INTEGER
    },
    nombreMax: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'CreneauxZone',
    timestamps: false,
    freezeTableName: true
  });

  return CreneauxZone;
};
