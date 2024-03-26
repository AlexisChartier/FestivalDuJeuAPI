const { Model, DataTypes } = require('sequelize');

class CreneauxPoste extends Model {}

module.exports = (sequelize) => {
  CreneauxPoste.init({
    idCreneauPoste: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idPoste: {
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
    modelName: 'CreneauxPoste',
    timestamps: false,
    freezeTableName: true
  });

  return CreneauxPoste;
};
