const { Model, DataTypes } = require('sequelize');

class JeuZone extends Model {}

module.exports = (sequelize) => {
  JeuZone.init({
    idJeu: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    idZone: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    recu: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'JeuZone',
    timestamps: false,
    freezeTableName: true
  });

  return JeuZone;
};
