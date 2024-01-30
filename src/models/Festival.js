const { Model, DataTypes } = require('sequelize');

class Festival extends Model {}
/**
    idFestival INT PRIMARY KEY,
    nom VARCHAR(80),
    dateDebut VARCHAR(10),
    dateFin VARCHAR(10)
 */

module.exports = (sequelize) => {
    Festival.init({
        idFestival: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING(80),
            allowNull: false
        },
        dateDebut: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dateFin: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Festival',
        tableName: 'Festival',
        timestamps: false
    });
    return Festival;
}