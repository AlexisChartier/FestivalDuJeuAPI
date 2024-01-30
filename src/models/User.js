const { Model, DataTypes } = require('sequelize');

class User extends Model {}

module.exports = (sequelize) => {
  User.init({
    pseudo: {
      type: DataTypes.STRING(30),
      primaryKey: true,
      allowNull: false
    },
    email : {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    nom: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    prenom: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    mdp: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    associations: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null
    },
    tel : {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    tailleTshirt: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    vegetarien: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    hebergement: { // true proposer un hébergement, false demander un hébergement
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false,
    freezeTableName: true
  });

  return User;
};
