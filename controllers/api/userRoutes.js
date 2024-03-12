const router = require("express").Router();
const User = require("../../models");

//Create a user
router.post("/signup", async (req, res) => {
    try {
        User.create(req.body)
            .then((newUser) => {
                res.json(newUser);
            })
            .catch((err) => {
                res.json(err);
            });
    } catch (err) {
        res.status(400).json(err);
    }
});

//Login user
router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({ where: { name: req.body.name } });
        if (!userData) {
            res.status(400).json({
                message: "Incorrect username or password, please try again",
            });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({
                message: "Incorrect username or password, please try again",
            });
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: "You are now logged in!" });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//Logout
router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

//View all users (For Testing Purposes)

router.get("/", async (req, res) => {
    try {
        const usersData = await User.findAll({
            // Uncomment this once we have all the trip data
            // include: [
            //     {model: Trip},
            // ],
        });
        res.json(usersData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
