const { Model, DataTypes } = require('sequelize');

class CreneauxPoste extends Model {}

module.exports = (sequelize) => {
  CreneauxPoste.init({
    idCreneauxPoste: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    plageHoraire: {
      type: DataTypes.INTEGER
    },
    nombreMax: {
      type: DataTypes.INTEGER
    },
    idPoste: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'CreneauxPoste',
    timestamps: false,
    freezeTableName: true
  });

  return CreneauxPoste;
};
