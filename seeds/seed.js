const sequelize = require("../config/connection");
const { User, Journey } = require("../models");

const userData = require("./userData.json");
// const tripData = require('./tripData.json');
// const commentData =require('./commentData.json')
const journeyData = require("./journeyData.json");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const journey of journeyData) {
        await Journey.create({
            ...journey,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }
    // const comments = await Comment.bulkCreate(commentData, {
    //   individualHooks: true,
    //   returning: true,
    // });

    process.exit(0);
};

seedDatabase();
