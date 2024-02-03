const { Model, DataTypes } = require('sequelize');

class InscriptionCreneauxZone extends Model {}

module.exports = (sequelize) => {
  InscriptionCreneauxZone.init({
    idUser: {
      type: DataTypes.STRING(30),
      primaryKey: true
    },
    idCreneauxZone: {
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
