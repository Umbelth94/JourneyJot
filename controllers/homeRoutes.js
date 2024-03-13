const router = require("express").Router();
const withAuth = require("../utils/auth");
const { User } = require("../models/");

//Renders the homepage
router.get("/", (req, res) => {
    if (req.session.logged_in) {
        // User is logged in, render homepage with logged_in flag
        res.render("homepage", {
            logged_in: true,
        });
    } else {
        // User is not logged in, render homepage without logged_in flag
        res.render("homepage", {
            logged_in: false,
        });
    }
});

//Renders login page
router.get("/login", async (req, res) => {
    try {
        res.render("login");
    } catch (err) {
        res.status(500).json(err);
    }
});

//Renders journeys page
router.get("/journeys", async (req, res) => {
    try {
        res.render("journeys");
    } catch (err) {
        res.status(500).json(err);
    }
});

//Renders user dashboard
router.get("/trips", withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exlude: ["password"] },
            // include: [{ model: Trip }],
        });

        const user = userData.get({ plain: true });

        res.render("myTrips", {
            ...user,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/adventure", withAuth, async (req, res) => {
    try {
        res.render("adventure");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
