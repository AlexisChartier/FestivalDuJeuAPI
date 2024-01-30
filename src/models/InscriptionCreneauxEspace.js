const { Model, DataTypes } = require('sequelize');

class InscriptionCreneauxEspace extends Model {}

module.exports = (sequelize) => {
  InscriptionCreneauxEspace.init({
    idUser: {
      type: DataTypes.STRING(30),
      primaryKey: true
    },
    idCreneauxEspace: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'InscriptionCreneauxEspace',
    timestamps: false,
    freezeTableName: true
  });

  return InscriptionCreneauxEspace;
};
