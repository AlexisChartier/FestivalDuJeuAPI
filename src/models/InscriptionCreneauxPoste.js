const { Model, DataTypes } = require('sequelize');

class InscriptionCreneauxPoste extends Model {}

module.exports = (sequelize) => {
  InscriptionCreneauxPoste.init({
    idUser: {
      type: DataTypes.STRING(30),
      primaryKey: true
    },
    idCreneauxPoste: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'InscriptionCreneauxPoste',
    timestamps: false,
    freezeTableName: true
  });

  return InscriptionCreneauxPoste;
};
