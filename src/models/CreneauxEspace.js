const { Model, DataTypes } = require('sequelize');

class CreneauxEspace extends Model {}

module.exports = (sequelize) => {
  CreneauxEspace.init({
    idCreneauxEspace: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    idEspace: {
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
    modelName: 'CreneauxEspace',
    timestamps: false,
    freezeTableName: true
  });

  return CreneauxEspace;
};
