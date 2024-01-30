const { Model, DataTypes } = require('sequelize');

class FestivalPoste extends Model {}

module.exports = (sequelize) => {
  FestivalPoste.init({
    idFestival: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    idPoste: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'FestivalPoste',
    timestamps: false,
    freezeTableName: true
  });

  return FestivalPoste;
};
