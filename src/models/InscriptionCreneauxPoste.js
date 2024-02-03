const { Model, DataTypes } = require('sequelize');

class InscriptionCreneauxPoste extends Model {}

module.exports = (sequelize) => {
  InscriptionCreneauxPoste.init({
    pseudo: {
      type: DataTypes.STRING(30),
      primaryKey: true
    },
    idCreneauPoste: {
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
