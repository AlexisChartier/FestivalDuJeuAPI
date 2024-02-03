const { Model, DataTypes } = require('sequelize');

class Jeu extends Model {}

module.exports = (sequelize) => {
  Jeu.init({
    idJeu: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    auteur: {
      type: DataTypes.STRING,
      allowNull: true
    },
    editeur: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nbJoueurs: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ageMin: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    duree: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notice: {
      type: DataTypes.STRING,
      allowNull: true
    },
    aAnimer: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    recu: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    mecanismes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    themes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tags: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    video: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Jeu',
    timestamps: false,
    freezeTableName: true
  });

  return Jeu;
};
