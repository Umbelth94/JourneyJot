const User = require("../models/user.js");

function authenticateUser(req, res, next) {
    if (req.session && req.session.user_id) {
        // Fetch user data based on user_id stored in the session
        const userId = req.session.user_id;
        User.findByPk(userId)
            .then((user) => {
                if (user) {
                    req.user = user; // Attach user object to req.user
                }
                next();
            })
            .catch((err) => {
                console.error("Error retrieving user:", err);
                next(err);
            });
    } else {
        next();
    }
}

module.exports = authenticateUser;
