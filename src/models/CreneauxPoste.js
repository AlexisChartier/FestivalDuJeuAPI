const { Model, DataTypes } = require('sequelize');

class CreneauxPoste extends Model {}

module.exports = (sequelize) => {
  CreneauxPoste.init({
    idCreneauPoste: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
