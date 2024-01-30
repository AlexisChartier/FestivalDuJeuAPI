const { Model, DataTypes } = require('sequelize');

class JeuEspace extends Model {}

module.exports = (sequelize) => {
  JeuEspace.init({
    idJeu: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    idEspace: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    recu: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'JeuEspace',
    timestamps: false,
    freezeTableName: true
  });

  return JeuEspace;
};
