const User = require("./user.js");
const Trip = require("./trip.js");
const Comment = require("./comment.js");
const Journey = require("./journey.js");

// Association
// user-Trip
User.hasMany(Trip, {
    foreignKey: "user_id",
});
// trip-user
Trip.belongsTo(User, {
    foreignKey: "user_id",
});
// comment-user
Comment.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    hooks: true,
});
// comment-trip
Comment.belongsTo(Journey, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    hooks: true,
});
// user-comment
User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    hooks: true,
});
// trip-comment
Journey.hasMany(Comment, {
    foreignKey: "post_id",
    onDelete: "CASCADE",
    hooks: true,
});

Journey.belongsTo(User, {
    foreignKey: "user_id",
});

User.hasMany(Journey, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

module.exports = { User, Trip, Comment, Journey };
