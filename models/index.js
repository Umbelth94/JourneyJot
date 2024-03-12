const User = require("./user.js");
const Trip = require("./trip.js");
const Comment = require("./comment.js");

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
Comment.belongsTo(Trip, {
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
Trip.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    hooks: true,
});

module.exports = { User, Trip, Comment };
