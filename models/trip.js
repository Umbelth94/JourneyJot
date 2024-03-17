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
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: [],
            get() {
                // Convert JSON string to an array when retrieving the data from the database
                const activitiesArray = this.getDataValue("activities");
                return activitiesArray ? JSON.parse(activitiesArray) : [];
            },
            set(activities) {
                // Convert array to JSON string when setting data in the database
                this.setDataValue("activities", JSON.stringify(activities));
            },
        },
        accessories: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                // Convert JSON string to an array when retrieving the data from the database
                const accessoriesString = this.getDataValue("accessories");
                return accessoriesString ? JSON.parse(accessoriesString) : [];
            },
            set(accessories) {
                // Convert array to JSON string when setting data in the database
                this.setDataValue("accessories", JSON.stringify(accessories));
            },
        },
        funFact: {
            type: DataTypes.STRING(500),
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
