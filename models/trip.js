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
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        month: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id",
            },
        },
    },
    {
        sequelize: sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "trip",
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
