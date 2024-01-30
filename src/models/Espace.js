const { Model, DataTypes } = require('sequelize');

class Espace extends Model {}

module.exports = (sequelize) => {
  Espace.init({
    idEspace: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(30)
    },
    idFestival: {
      type: DataTypes.INTEGER
    },
    idPoste: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Espace',
    timestamps: false,
    freezeTableName: true
  });

  return Espace;
};
