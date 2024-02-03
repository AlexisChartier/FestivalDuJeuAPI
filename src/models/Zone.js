const { Model, DataTypes } = require('sequelize');

class Zone extends Model {}

module.exports = (sequelize) => {
  Zone.init({
    idZone: {
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
    modelName: 'Zone',
    timestamps: false,
    freezeTableName: true
  });

  return Zone;
};
