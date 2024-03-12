//Trip will be saved to a user (User has many trips, trips has one user)
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Trip extends Model {}

Trip.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        activities: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accesories: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        funFact: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tripDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize: sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "Trip",
    },
);

module.exports = Trip;

//Contains:
//Id
//Activities
//Accessories/Things to pack
//Fun fact
//Location
//Day they would like to go
