const { Model, DataTypes } = require('sequelize');

class Role extends Model {}

module.exports = (sequelize) => {
  Role.init({
    idRole: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING(100)
    }
  }, {
    sequelize,
    modelName: 'Role',
    timestamps: false,
    freezeTableName: true
  });

  return Role;
};
