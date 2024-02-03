const { Model, DataTypes } = require('sequelize');

class Poste extends Model {}

module.exports = (sequelize) => {
  Poste.init({
    idPoste: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    nom: {
      type: DataTypes.STRING(30)
    },
    details: {
      type: DataTypes.STRING(300)
    },
    pseudoReferent: {
      type: DataTypes.STRING(30)
    }
  }, {
    sequelize,
    modelName: 'Poste',
    tableName: 'Poste',
    timestamps: false,  // Pour utiliser le nom de la table tel quel
  });

  return Poste;
};
