const {Model, DataTypes } = require('sequelize');

class FestivalUser extends Model {}

module.exports = (sequelize) => {
  FestivalUser.init({
    idFestival: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    pseudo: {
      type: DataTypes.STRING(30),
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'FestivalUser',
    timestamps: false,
    freezeTableName: true
  });

  return FestivalUser;
};