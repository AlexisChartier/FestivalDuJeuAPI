const { Model, DataTypes } = require('sequelize');

class InscriptionCreneauxZone extends Model {}

module.exports = (sequelize) => {
  InscriptionCreneauxZone.init({
    pseudo: {
      type: DataTypes.STRING(30),
      primaryKey: true
    },
    idCreneauZone: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'InscriptionCreneauxZone',
    timestamps: false,
    freezeTableName: true
  });

  return InscriptionCreneauxZone;
};
