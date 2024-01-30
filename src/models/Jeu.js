const { Model, DataTypes } = require('sequelize');

class Jeu extends Model {}

module.exports = (sequelize) => {
  Jeu.init({
    idJeu: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    nomJeu: {
      type: DataTypes.STRING(80)
    },
    lien: {
      type: DataTypes.STRING(200)
    }
  }, {
    sequelize,
    modelName: 'Jeu',
    timestamps: false,
    freezeTableName: true
  });

  return Jeu;
};
